/* Contexto que armazena o vetor de layers, juntamente de suas informações e características, que serão mostradas em mapa. */

import React, {
   createContext,
   Dispatch,
   SetStateAction,
   useCallback,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react';

import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Style, Stroke, Circle, Fill, Text} from 'ol/style';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';

import QueryContext from './query';
 
// Interface dos filtros
export interface IFilter {
   type: string;

   label: string;
   value: string;

   fillColor: string;
   isFillColorRandom: boolean;

   strokeColor: string;
   isStrokeColorRandom: boolean;
}

// Interface dos itens da legenda dos filtros.
export interface IFilterSubtitle {
   type: string;

   minValue?: number;
   maxValue?: number;
   categoryValue?: string;

   fillColor: string;
   strokeColor: string;

   filteredFeatures: Feature<Geometry>[];
}

interface ContextData {
   layers: Array<VectorLayer<VectorSource<any>>>;
   setLayers: Dispatch<SetStateAction<VectorLayer<VectorSource<any>>[]>>;
}

const LayersContext = createContext<ContextData>({} as ContextData);

export const LayersProvider: React.FC = ({ children } : any) => {
   const { tableValuesMinimumPath, hasGeomValue, tableHasGeomValue, tableValues } = useContext(QueryContext);

   // IDs das camadas (para facilitar identificação de cada uma).
   const [id, setId] = useState(0);
   
   // Vetor de camadas em si.
   const [layers, setLayers] = useState<VectorLayer<VectorSource<any>>[]>([]);

   // Flag utilizada para demarcar a primeira renderização.
   const isInitialMount = useRef(true);

   useEffect(() => {
      // Pseudo-layer do mapa (usada para indexação da legenda).
      if (isInitialMount.current) {
         setLayers([
            new VectorLayer({
               // Tipagem desnecessária nesse caso (openlayers reconhece atributos personalizados automaticamente)
               //@ts-ignore
               id,
            }),
         ]);

         setId((id) => id + 1);

         isInitialMount.current = false;
      } else {         
         if (tableHasGeomValue) {
            // Armazenamento do geojson de cada valor da tabela de barragens, para uso no objeto que será o download da camada.
            const valuesGeoJSON = tableValues.map((value: any) => value.geomjson);

            // Geração das features individualmente para que seja possível armazenar em cada uma as informações referentes à própria.
            let features: Feature<Geometry>[] = [];
            tableValues.forEach((value: any, index: number) => {
               value.geomjson = JSON.parse(value.geomjson);
               
               features.push(
                  // Nova feature gerada a partir da leitura do geoJSON do resultado.
                  new GeoJSON().readFeature(value.geomjson, {
                     featureProjection: 'EPSG:3857',
                     dataProjection: "EPSG:3857",
                  })
               );

               delete value.geomjson;

               // Armazenamento das informações de cada feature.
               features[index].set('info', value);
            });

            // A fonte (source) das informações para geração da camada.
            const vectorSource = new VectorSource({
               // Features da fonte serão aquelas geradas anteriormente, transformadas em apenas um objeto geoJSON.
               features: new GeoJSON().readFeatures(new GeoJSON().writeFeaturesObject(features), {
                  featureProjection: 'EPSG:3857',
               }),
            });

            // Obtenção das cores e formatos randômicos iniciais.
            const colorFill = '#28A2DB';
            const colorStroke = '#616462';

            const styleFeature = new Style({
               image: new Circle({
                 radius: 5,
                 fill: new Fill({
                   color: colorFill,
                 }),
                 stroke: new Stroke({
                   color: colorStroke,
                   width: 2,
                 }),
               }),
               zIndex: Infinity,
             });

            // Captação do objeto GeoJSON representando a camada a ser renderizada, para posterior utilização no download das camadas.
            const geoJSONObject = {
               type: 'FeatureCollection',
               features: [...valuesGeoJSON],
            };

            // A layer em si
            const vectorLayer = new VectorLayer({
               // Tipagem desnecessária nesse caso (openlayers reconhece atributos personalizados automaticamente).
               //@ts-ignore
               id,
               // Classname necessário para evitar que labels 'declutteradas' sobreponham outras layers (https://github.com/openlayers/openlayers/issues/10096)
               className: `Layer ${id}`,
               geoJson: geoJSONObject,
               source: vectorSource,
            });

            // Estilização das features.
            vectorLayer.setStyle(styleFeature)
            
            // Atualização do vetor de layers e do contador de ID das layers.
            setLayers((oldLayers) => [...oldLayers, vectorLayer]);
            setId((id) => id + 1);
         }
         
         if (hasGeomValue) {
            // Armazenamento do geojson de cada valor da tabela de barragens, para uso no objeto que será o download da camada.
            const valuesGeoJSON = tableValuesMinimumPath.map((value: any) => value.geomjson);

            // Geração das features individualmente para que seja possível armazenar em cada uma as informações referentes à própria.
            let features: Feature<Geometry>[] = [];
            tableValuesMinimumPath.forEach((value: any, index: number) => {
               value.geomjson = JSON.parse(value.geomjson);
               
               features.push(
                  // Nova feature gerada a partir da leitura do geoJSON do resultado.
                  new GeoJSON().readFeature(value.geomjson, {
                     featureProjection: 'EPSG:3857',
                     dataProjection: "EPSG:3857",
                  })
               );

               delete value.geomjson;

               // Armazenamento das informações de cada feature.
               features[index].set('info', value);
            });

            // A fonte (source) das informações para geração da camada.
            const vectorSource = new VectorSource({
               // Features da fonte serão aquelas geradas anteriormente, transformadas em apenas um objeto geoJSON.
               features: new GeoJSON().readFeatures(new GeoJSON().writeFeaturesObject(features), {
                  featureProjection: 'EPSG:3857',
               }),
            });

            // Obtenção das cores e formatos randômicos iniciais.
            //const colorFill = '#28A2DB';
            const colorStroke = 'red';

            const styleFeature = new Style({
               stroke: new Stroke({
                  color: colorStroke,
                  width: 4,
                }),
             });

            // Captação do objeto GeoJSON representando a camada a ser renderizada, para posterior utilização no download das camadas.
            const geoJSONObject = {
               type: 'FeatureCollection',
               features: [...valuesGeoJSON],
            };

            // A layer em si
            const vectorLayer = new VectorLayer({
               // Tipagem desnecessária nesse caso (openlayers reconhece atributos personalizados automaticamente).
               //@ts-ignore
               id,
               // Classname necessário para evitar que labels 'declutteradas' sobreponham outras layers (https://github.com/openlayers/openlayers/issues/10096)
               className: `Layer ${id}`,
               geoJson: geoJSONObject,
               source: vectorSource,
            });

            // Estilização das features.
            vectorLayer.setStyle(styleFeature)
            
            // Atualização do vetor de layers e do contador de ID das layers.
            setLayers((oldLayers) => [...oldLayers, vectorLayer]);
            setId((id) => id + 1);
         }
      }
      return () => {};
      // Necessário para evitar loops infinitos na criação de layers
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tableValuesMinimumPath, tableValues, tableHasGeomValue, hasGeomValue]);

   return (
      <LayersContext.Provider
         value={{
            layers,
            setLayers
         }}
      >
         {children}
      </LayersContext.Provider>
   );
};

export default LayersContext;
