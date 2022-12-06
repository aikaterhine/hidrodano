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
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// components
import {Panel} from '../panel/Panel';

import LayersContext from '../../contexts/layers';
import QueryContext from '../../contexts/query';
import TablesContext from '../../contexts/tables';

import mapConsumerStyles from './MapConsumer.Style';
import './MapConsumer.Style.css';

interface MapConsumerProps {
  layers: Array<VectorLayer<VectorSource<any>>>;
  setLayers: Dispatch<SetStateAction<VectorLayer<VectorSource<any>>[]>>;
}

export const MapConsumer: React.FC = ({ children } : MapConsumerProps) => {
  const { layers } = useContext(LayersContext);
  const { loading } = useContext(QueryContext);
  const { getTableBarragensById } = useContext(TablesContext);

  /**Referência que mantém o status de renderização do componente, para evitar vazamentos de memória em tarefas assíncronas realizadas em componentes já desmontados */
  const isMounted = useRef(true);
  
  // set initial state
  const [map, setMap] = useState<Map>();

  // create state ref that can be accessed in OpenLayers onclick callback function
  const mapRef = useRef()
  mapRef.current = map
  
  const [openPanel, setOpenPanel] = useState(false);

  const onClickOpenPanel = (codigo_snisb: {any}) => {
    getTableBarragensById(codigo_snisb);
    setOpenPanel(true);
  }

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect( () => {
    // Seleção das features.
    const select = new Select();
    select.set('id', 'select');

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
    <Grid
      container
      spacing={3}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={mapConsumerStyles.grid}>
      <Grid item xs={openPanel?8:10} style={mapConsumerStyles.gridItem}>
        {loading ?
          <div style={mapConsumerStyles.appLoading}>
            <div style={{justifyContent: 'center', marginTop: '15%'}}>
              <CircularProgress color="grey" style={{width: 50}}/>
              <Typography style={{ fontSize: 20, fontFamily: 'poppins', fontWeight: '900', paddingTop: 15}}>Carregando</Typography>
            </div>
          </div> : null
        }

        <div style={mapConsumerStyles.app}>
          <div style={mapConsumerStyles.appZoomControl}>
          </div>

          <div style={loading?{pointerEvents: 'none'}:null}>    
            <div ref={mapRef} style={mapConsumerStyles.mapContainer}></div>
          </div>
        </div>
      </Grid>
      { openPanel ?
        <Grid item xs={3}>
          <Panel style={mapConsumerStyles.appPanel}/>
        </Grid> : null
      }
  </Grid>
  )
};