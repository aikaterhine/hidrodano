// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';

import mapStyles from './Map.Style'; 
import {MapConsumer} from '../../components/map/MapConsumer';

import {TablesProvider} from '../../contexts/tables';
import {QueryProvider} from '../../contexts/query';
import {LayersProvider} from '../../contexts/layers';

const MapWrapper = () => {
  return (
    <TablesProvider>
      <QueryProvider>
        <LayersProvider>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={mapStyles.grid}>
            <Grid item xs={11} style={mapStyles.gridItem}>
              <MapConsumer/>
            </Grid>
          </Grid>
        </LayersProvider>
      </QueryProvider>
    </TablesProvider>      
  );
}

export default MapWrapper;
