// @ts-nocheck
// react
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {Style, Stroke} from 'ol/style';
import {transform} from 'ol/proj'
import OSM from 'ol/source/OSM';
import {Zoom, ScaleLine, defaults} from 'ol/control';

import mapOpenLayersStyles from './MapOpenLayers.Style'; 
import './MapWrapper.Style.css';

function MapWrapper(props: any) {

  // set intial state
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ selectedCoord , setSelectedCoord ] = useState()

  // pull refs
  const mapElement = useRef()
  
  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect( () => {

    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.4)',
          width: 2
        }),
      }),
    })

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // USGS Topo
        new TileLayer({
          source: new OSM()
        }),
        initalFeaturesLayer
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [-5557277.704445, -1594782.158142],        
        zoom: 0
      }),
      controls: [new Zoom()],
    })

    // set map onclick handler
    initialMap.on('click', handleMapClick)

    // save map and vector layer references to state
    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)

  },[])

  // update map if features prop changes - logic formerly put into componentDidUpdate
  useEffect( () => {

    if (props.features.length) { // may be null on first render

      // set features to map
      featuresLayer.setSource(
        new VectorSource({
          features: props.features // make sure features is an array
        })
      )

      // fit map to feature extent (with 100px of padding)
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100,100,100,100]
      })

    }

  },[props.features])

  // map click handler
  const handleMapClick = (event) => {
    
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    // set React state
    setSelectedCoord( transformedCoord )    
  }

  // render component
  return (      
    <div>    
      <div ref={mapElement} style={mapOpenLayersStyles.mapContainer}></div>
    </div>
  ) 

}

export default MapWrapper