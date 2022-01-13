import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export const Mapbox = ()=> {

  const [viewport, setViewport] = useState({
    latitude: 41.5868,
    longitude: -93.625,
    zoom: 13,
    width: "100vw",
    height: "100vh",
  });
  console.log(viewport,'viewport')

  return (
    <ReactMapGL
    mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
    mapboxApiAccessToken={process.env.mabbox_key}
      {...viewport}
      onViewportChange={(nextViewport :any) => setViewport(nextViewport)}
    >
     
    </ReactMapGL>
  );
}
