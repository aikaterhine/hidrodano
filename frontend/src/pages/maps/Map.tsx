// @ts-nocheck
import React from 'react';
import {MapConsumer} from '../../components/map/MapConsumer';

import {TablesProvider} from '../../contexts/tables';
import {QueryProvider} from '../../contexts/query';
import {LayersProvider} from '../../contexts/layers';

const MapWrapper = () => {
  return (
    <TablesProvider>
      <QueryProvider>
        <LayersProvider>
          <MapConsumer/>
        </LayersProvider>
      </QueryProvider>
    </TablesProvider>      
  );
}

export default MapWrapper;
