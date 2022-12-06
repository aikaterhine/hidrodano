/* Contexto que armazena as tabelas recebidas do banco, para evitar chamadas repetitivas à api. */
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';

import api from '../services/api';
import { Result } from './query';

interface ContextData {
   database: string;

   tableValues: Array<any>;

   tableHasGeomValue: boolean;
   
   getTableBarragens(database: string): Promise<void>;
   setTableHasGeomValue(tableHasGeomValue: boolean): any;

   barragemId: string;
   setBarragemId(barragemId: string): any;

   barragemProperties: any;

   getTableBarragensById(barragemId: string) : any; 

   loading: boolean;
}

const TablesContext = createContext<ContextData>({} as ContextData);

export const TablesProvider: React.FC = ({ children } : any) => {
   /**Referência que mantém o status de renderização do componente, para evitar vazamentos de memória em tarefas assíncronas realizadas em componentes já desmontados */
   const isMounted = useRef(true);

// Banco de dados selecionado atualmente.
   const [database, setDatabase] = useState(
      sessionStorage.getItem('@hidrodano/selected-database')
      ? sessionStorage.getItem('@hidrodano/selected-database')!
      : 'barragens'
   );

   // Tabela de barragens com suas respectivas linhas.
   const [tableValues, setTableValues] = useState([]);

   // Id da barragem escolhida pelo usuário.
   const [barragemId, setBarragemId] = useState('');
    
   // Resultados obtidos da consulta.
   const [barragemProperties, setBarragemProperties] = useState([]);

   // Flag para identificar se o resultado geométrico da tabela de barragens foi lido.
   const [tableHasGeomValue, setTableHasGeomValue] = useState(false);

   // Flag ativada enquanto a chamada à api é realizada.
   const [loading, setLoading] = useState(false);

   // Função que realiza a chamada à api, para recuperar a tabela de barragens do banco.
   const getTableBarragens = useCallback(async (database: string) => {
      try {
         setLoading(true);

         sessionStorage.setItem('@hidrodano/selected-database', database);
         setDatabase(database);

         const { data: { values } } = await api.get('/barragens', { params: { database } });

         if (!isMounted.current) return;

         // Checa se os objetos recebidos em resposta possuem a propriedade geométrica, e marca a flag.
         if (values[0]) {
            if (values[0].hasOwnProperty('geomjson')) {
               setTableHasGeomValue(true);
            } else {
               setTableHasGeomValue(false);
            }
         }

         setTableValues(values);

         setLoading(false);
      } catch (e) {
         console.log(e)
         return;
      }
   }, []);

   const getTableBarragensById = useCallback(
      async (barragemId: string) => {
         try {
            setLoading(true);
            setBarragemId(barragemId);
            
            const { data: { values } } = await api.get('/barragens/id', { params: { database: database, barragemId: barragemId } });
  
            if (!isMounted.current) return;
  
            setBarragemProperties(values[0]);
            setLoading(false);
         } catch {
            return;
         }
      },
      [barragemProperties]
    );

   useEffect(() => {
      getTableBarragens(database);

      return () => {};
      // eslint-disable-next-line
   }, [getTableBarragens]);

   /**Atualiza a referência para indicar que o componente foi desmontado */
   useEffect(() => {
      return () => {
         isMounted.current = false;
      };
   }, []);

   return (
      <TablesContext.Provider
         value={{ database, tableValues, tableHasGeomValue, loading, barragemProperties, barragemId, setBarragemId, getTableBarragensById, getTableBarragens, setTableHasGeomValue }}
      >
         {children}
      </TablesContext.Provider>
   );
};

export default TablesContext;
