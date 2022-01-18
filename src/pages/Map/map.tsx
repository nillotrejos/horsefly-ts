import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export const Mapbox = ()=> {

  const [viewport, setViewport] = useState({
    latitude: 41.5868,
    longitude: -93.625,
    zoom: 13,
    width: "110vh",
    height: "100vh",
  });

  return (
    <ReactMapGL
    mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxApiAccessToken={process.env.mabbox_key}
      {...viewport}
      onViewportChange={(nextViewport :any) => setViewport(nextViewport)}
    >
     
    </ReactMapGL>
  );
}