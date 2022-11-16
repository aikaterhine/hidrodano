// @ts-nocheck
import React, { useState, useEffect } from 'react';

// openlayers
import GeoJSON from 'ol/format/GeoJSON'

// components
import MapWrapper from './MapWrapper'
import mapOpenLayersStyles from './MapOpenLayers.Style'; 

function MapOpenLayers() {
  
  // set intial state
  const [ features, setFeatures ] = useState([])

  // initialization - retrieve GeoJSON features from Mock JSON API get features from mock 
  //  GeoJson API (read from flat .json file in public directory)
  useEffect( () => {

    fetch('/mock-geojson-api.json')
      .then(response => response.json())
      .then( (fetchedFeatures) => {

        // parse fetched geojson into OpenLayers features
        //  use options to convert feature from EPSG:4326 to EPSG:3857
        const wktOptions = {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        }
        const parsedFeatures = new GeoJSON().readFeatures(fetchedFeatures, wktOptions)

        // set features into state (which will be passed into OpenLayers
        //  map component as props)
        setFeatures(parsedFeatures)

      })

  },[])
  
  return (
    <div style={mapOpenLayersStyles.app}>
      
      <div style={mapOpenLayersStyles.appLabel}>
      </div>
      
      <MapWrapper features={features} />

    </div>
  )
}

export default MapOpenLayers
