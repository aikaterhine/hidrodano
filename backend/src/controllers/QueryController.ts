import { Request, Response } from 'express';
import { Client } from 'pg';

export default class QueryController {
   public async show(request: Request, response: Response) {
      const { database,  barragemId }: { database: string, barragemId: string } = request.body;

      const client = new Client({
         host: 'localhost',
         database: database as string || 'barragens',
         port: 5432,

         user: 'postgres',
         password: 'postgres',
      });

      try {
         await client.connect();
         
         await client.query(`SET search_path = geodata, public;`);

         // Cria uma tabela temporária para armazenar os resultados da consulta realizada, e recupera o conteúdo da mesma.
         await client.query(`DROP TABLE IF EXISTS bho_minimum_path;`);
         await client.query(`DROP TABLE IF EXISTS bho_minimum_path_geom;`);
         await client.query(`DROP TABLE IF EXISTS results;`);

         await client.query(`DROP FUNCTION IF EXISTS execute_dkijstra;`)
         await client.query(`DROP FUNCTION IF EXISTS array_unique_stable;`)

         await client.query(`CREATE TEMP TABLE bho_minimum_path (node bigint);`);
         await client.query(`CREATE TEMP TABLE bho_minimum_path_geom (node bigint, geom_ geometry (LineString, 4674));`);
         await client.query(`CREATE TEMP TABLE results (node_id integer);`);

         await client.query(`
                              create function array_unique_stable(p_input anyarray)
                              returns anyarray immutable strict parallel safe 
                              language sql
                              as 
                              $$
                              select array_agg(t order by x)
                              from (
                                 select distinct on (t) t,x
                                 from unnest(p_input) with ordinality as p(t,x)
                                 order by t,x
                              ) t2;
                              $$
         `);

         await client.query(`
                              CREATE OR REPLACE FUNCTION execute_dkijstra() RETURNS VOID AS $$
                                 DECLARE
                                    barragem_node_id bigint;
                                    barragem_codigo_snisb integer;

                                    ponto_id bigint;
                                    ponto_geom geometry;

                                    arcos_conectados_id bigint[];
                                    arcos_conectados_corio character varying[];

                                    foz_arcos_conectados_geom geometry[];
                                    foz_arcos_conectados_cotrecho character varying[];

                                    arco character varying;
                                    foz geometry;
                                    foz_pontos_id bigint;

                                    arcos_conectados_corio_unique character varying[];

                                    minimum_path_geom geometry[];
                                    minimum_path_node_id bigint[];
                                    path_node_id bigint;

                                    outputVar bigint;
                                    
                                 BEGIN                                    
                                    SELECT cast(b.node_id as bigint), b.codigo_snisb INTO barragem_node_id, barragem_codigo_snisb FROM barragem b WHERE b.codigo_snisb = ${barragemId};
                              
                                    SELECT ponto.the_geom INTO ponto_geom FROM bho_trecho_drenagem_vertices_pgr ponto WHERE id=barragem_node_id;
                                 
                                    SELECT array_agg(DISTINCT(b.id)), array_agg(b.corio) INTO arcos_conectados_id, arcos_conectados_corio FROM bho_trecho_drenagem_noded b WHERE ST_DWithin(ponto_geom::geography, ST_SetSRID(b.geom_::geography, 4674), 1.00);
                               
                                    FOREACH arco IN ARRAY arcos_conectados_corio LOOP
                                       SELECT array_agg(area_montante.cotrecho), array_agg(area_montante.geom) INTO foz_arcos_conectados_cotrecho, foz_arcos_conectados_geom FROM bho_trecho_drenagem_maior_area_montante as area_montante WHERE area_montante.corio=arco;
                                    END LOOP;
                              
                                    FOREACH foz IN ARRAY foz_arcos_conectados_geom LOOP
                                       SELECT b.id INTO foz_pontos_id FROM bho_trecho_drenagem_vertices_pgr b WHERE ST_DWithin(foz::geography, ST_SetSRID(b.the_geom::geography, 4674), 1.00) LIMIT 1;
                                    END LOOP;
                              
                                    SELECT array_agg(minimum_path.edge) as node INTO minimum_path_node_id FROM pgr_dijkstra('SELECT id, source, target, cost, reverse_cost FROM bho_trecho_drenagem_noded', barragem_node_id, foz_pontos_id) AS minimum_path;
                                    
                                    FOREACH path_node_id IN ARRAY minimum_path_node_id LOOP
                                       INSERT INTO bho_minimum_path (node) VALUES (path_node_id);
                                    END LOOP;

                                    INSERT INTO bho_minimum_path_geom SELECT minimum_path.*, noded.geom_ FROM bho_minimum_path minimum_path INNER JOIN bho_trecho_drenagem_noded noded ON minimum_path.node = noded.id;
                                 END;
                              $$ LANGUAGE plpgsql;
                           `);

         await client.query(`DO $$
                              BEGIN
                              PERFORM execute_dkijstra();
                              END;
                              $$;
                           `);

         let {rows: values} = await client.query(`
                                                      SELECT jsonb_build_object(
                                                         'type',       'Feature',
                                                         'id',         node,
                                                         'geometry',   ST_AsGeoJSON(geom_)::jsonb
                                                         ) as geomjson FROM bho_minimum_path_geom;
                                                   `)

         client.end();

         return response.json({ values });
      } catch (error) {
         if (client) {
            client.end();
         }
         return response.json((error as Error).message);
      }
   }
}