// @ts-nocheck
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { getUid } from 'ol/util';
import OSM from 'ol/source/OSM';
import {Zoom} from 'ol/control';
import Select from 'ol/interaction/Select';

// components
import {Panel} from '../panel/Panel';

import LayersContext from '../../contexts/layers';

import mapConsumerStyles from './MapConsumer.Style';
import './MapConsumer.Style.css';

import api from '../../services/api';

interface MapConsumerProps {
  layers: Array<VectorLayer<VectorSource<any>>>;
  setLayers: Dispatch<SetStateAction<VectorLayer<VectorSource<any>>[]>>;
}

export const MapConsumer: React.FC = ({ children } : MapConsumerProps) => {
  const { layers } = useContext(LayersContext);
  
  /**Referência que mantém o status de renderização do componente, para evitar vazamentos de memória em tarefas assíncronas realizadas em componentes já desmontados */
  const isMounted = useRef(true);
  
  // set initial state
  const [map, setMap] = useState<Map>();

  // create state ref that can be accessed in OpenLayers onclick callback function
  const mapRef = useRef()
  mapRef.current = map

  const [ barragemId, setBarragemId ] = useState('')
  // Resultados obtidos da consulta.
  const [barragemProperties, setBarragemProperties] = useState<Result[]>([]);

  // Flag ativada durante a chamada à api.
  const [loading, setLoading] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);

  const onClickOpenPanel = (codigo_snisb: {any}) => {
    submitQueryWithBarragemID(codigo_snisb);
    setBarragemId(codigo_snisb);
  }

  const submitQueryWithBarragemID = useCallback(
    async (barragemId: string) => {
       try {
          setLoading(true);

          const { data: { values } } = await api.get('/barragens/id', { params: { database: 'barragens', barragemId: barragemId } });

          if (!isMounted.current) return;

          setBarragemProperties(values[0]);
          setLoading(false);
          setOpenPanel(true);
       } catch {
          return;
       }
    },
    [barragemId]
  );

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect( () => {

    // Seleção das features.
    const select = new Select();
    select.set('id', 'select');

   /* const popup = new FixedPopup ({
      popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
      // anim: true,
      closeBox: true
    });*/

    // create map
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [-5711358.219482, -1711888.481450],        
        zoom: 4
      }),
      controls: [new Zoom()],
    })

    initialMap?.addInteraction(select);

    // set map onclick handler
    initialMap.on('singleclick', handleMapClick)

    // save map and vector layer references to state
    setMap(initialMap)

    return () => {
      select.getFeatures().clear();
    };

  }, [])

  /*--------------------------------- Função que realiza a renderização das layers no mapa ------------------------------------*/
  useEffect(() => {
    for (let layer of layers) {
      map?.removeLayer(layer);
      map?.addLayer(layer);
    }

    return () => {};
  }, [layers, map]);

  // map click handler
  const handleMapClick = (event) => {
    mapRef.current.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
      
      const layerId = getUid(layer);

      if(layerId != 3){
        const codigo_snisb = feature.getProperties().info.codigo_snisb;
        onClickOpenPanel(codigo_snisb); 
      }
    })
  }

  return (
    <div style={mapConsumerStyles.app}>
      
      <div style={mapConsumerStyles.appZoomControl}>
      </div>

      { openPanel ?     
      <div style={mapConsumerStyles.appPanelControl}>
        <Panel style={mapConsumerStyles.appPanel} barragemProperties={barragemProperties} loading={loading}/>
      </div> : null
      }

      <div>    
        <div ref={mapRef} style={mapConsumerStyles.mapContainer}></div>
      </div>
    </div>
  )
};