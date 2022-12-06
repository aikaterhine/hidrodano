/* Contexto que armazena as tabelas recebidas do banco, para evitar chamadas repetitivas à api. */
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';

import api from '../services/api';

interface ContextData {
   database: string;

   tableValues: Array<any>;

   tableHasGeomValue: boolean;
   
   getTable(database: string): Promise<void>;
   setTableHasGeomValue(tableHasGeomValue: boolean): any;

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

   // Flag para identificar se o resultado geométrico da tabela de barragens foi lido.
   const [tableHasGeomValue, setTableHasGeomValue] = useState(false);

   // Flag ativada enquanto a chamada à api é realizada.
   const [loading, setLoading] = useState(false);

   // Função que realiza a chamada à api, para recuperar a tabela de barragens do banco.
   const getTable = useCallback(async (database: string) => {
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

   useEffect(() => {
      getTable(database);

      return () => {};
      // eslint-disable-next-line
   }, [getTable]);

   /**Atualiza a referência para indicar que o componente foi desmontado */
   useEffect(() => {
      return () => {
         isMounted.current = false;
      };
   }, []);

   return (
      <TablesContext.Provider
         value={{ database, tableValues, tableHasGeomValue, getTable, setTableHasGeomValue, loading }}
      >
         {children}
      </TablesContext.Provider>
   );
};

export default TablesContext;
