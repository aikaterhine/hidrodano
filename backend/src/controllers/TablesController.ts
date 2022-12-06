import { Request, Response } from 'express';
import { Client } from 'pg';

export default class TablesController {
   public async getBarragens(request: Request, response: Response) {
      const { database } = request.query;
      
      const client = new Client({
         host: 'localhost',
         database: database as string || 'barragens',
         port: 5432,

         user: 'postgres',
         password: 'postgres',
      });

      try {
         await client.connect();

         // Retorna as feições da tabela de barragens.
         const { rows: values } = await client.query(
            `SELECT barragem.codigo_snisb, ST_AsGeoJSON(barragem.geom) AS geomjson FROM geodata.barragem barragem;`
         );

         client.end();

         return response.json({ values });
      } catch (error) {
         if (client) {
            client.end();
         }

         return response.status(400).json((error as Error).message);
      }
   };

   public async getBarragemById(request: Request, response: Response) {
      const { database, barragemId } = request.query;
       
      const client = new Client({
         host: 'localhost',
         database: database as string || 'barragens',
         port: 5432,

         user: 'postgres',
         password: 'postgres',
      });

      try {
         await client.connect();

         // Retorna as informações da barragem escolhida pelo usuário.
         const { rows: values } = await client.query(
            `SELECT codigo_snisb, nome_barr, uso_principal, uf, municipio, cat_risco, dano_potencial_assoc, orgao_fisc, reg_hidro 
            FROM geodata.barragem WHERE codigo_snisb=${barragemId};`
         );

         client.end();

         return response.json({ values });
      } catch (error) {
         if (client) {
            client.end();
         }

         return response.status(400).json((error as Error).message);
      }
   };
}
