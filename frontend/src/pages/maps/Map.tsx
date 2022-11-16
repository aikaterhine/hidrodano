import * as React from 'react';
import Grid from '@mui/material/Grid';

import mapStyles from './Map.Style'; 
import MapOpenLayers from '../../components/map/MapOpenLayers';

const Map = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={mapStyles.grid}
    >
      <Grid item xs={10} style={mapStyles.gridItem}>
        <MapOpenLayers/>
      </Grid>
    </Grid>
  );
}

export default Map;
