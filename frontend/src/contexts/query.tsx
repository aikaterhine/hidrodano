// @ts-nocheck

/* Contexto que armazena informações referentes à consulta realizada e aos resultados da mesma, para evitar chamadas repetitivas à api, e permitir que o contexto de layers tenha acesso. */
import React, {
    createContext,
    useCallback,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
    useRef,
    useEffect,
 } from 'react';
 
 //import { AxiosRequestConfig } from 'axios';
 
 import api from '../services/api';
 
 import TablesContext from './tables';
 
 export type Result = {
    [key: string]: string | number;
 };
 
 interface ContextData { 
    barragemId: string;
    setBarragemId: Dispatch<SetStateAction<string>>;
    getMinimumPathByBarragemId(): Promise<void>;
 
    hasGeomValue: boolean;
    tableHasGeomValue: boolean;
    
    tableValues: any;
    tableValuesMinimumPath: Result[];

    loading: boolean;
 }
 
 /**
 // Extensão da interface padrão de request do axios para permitir o envio do campo "barragemId".
 interface Query extends AxiosRequestConfig {
    barragemId: string;
    database: string;
 }
 **/

 const QueryContext = createContext<ContextData>({} as ContextData);
 
 export const QueryProvider: React.FC = ({ children }) => {
    const { database, tableValues, tableHasGeomValue, barragemId, setTableHasGeomValue } = useContext(TablesContext);

    /**Referência que mantém o status de renderização do componente, para evitar vazamentos de memória em tarefas assíncronas realizadas em componentes já desmontados */
    const isMounted = useRef(true);

    // Resultados obtidos da consulta.
    const [tableValuesMinimumPath, setTableValuesMinimumPath] = useState<Result[]>([]);

    // Flag para identificar se a consulta obteve algum resultado geométrico.
    const [hasGeomValue, setHasGeomValue] = useState(false);
    
    // Flag ativada durante a chamada à api.
    const [loading, setLoading] = useState(false);
 
    // Função que realiza a chamada à api, passando a id da barragem escolhida pelo usuário.
    const getMinimumPathByBarragemId = useCallback(
       async () => {
          try {
            setLoading(true);
           
            const { data: { values } } = await api.get('/barragens/minimum_path', { params: { database: database, barragemId: barragemId } });
            console.log(values)
            
            if (!isMounted.current) return;

            // Checa se os objetos recebidos em resposta possuem a propriedade geométrica, e marca a flag.
            if (values[0]) {
               if (values[0].hasOwnProperty('geomjson')) {
                  setHasGeomValue(true);
                  setTableHasGeomValue(false);
               } else {
                  setHasGeomValue(false);
               }
            }
 
            setTableValuesMinimumPath(values);  
            setLoading(false);
          } catch {
            return;
          }
       },
       [barragemId]
    );
 
    /**Atualiza a referência para indicar que o componente foi desmontado */
    useEffect(() => {
      return () => {
         isMounted.current = false;
      };
    }, []);
 
    return (
       <QueryContext.Provider
          value={{
             getMinimumPathByBarragemId,
             tableValuesMinimumPath,
             hasGeomValue,
             tableHasGeomValue,
             tableValues,
             loading,
          }}
       >
          {children}
       </QueryContext.Provider>
    );
 };
 
 export default QueryContext;
 