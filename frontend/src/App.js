import * as React from "react";
import ReactMapGL from 'react-map-gl';
function App() {
  
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX;
  
  return (
      <ReactMapGL
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: 80.220978, //79.861244,
          latitude:  6.053519, //6.927079,
          zoom:10
        }}  
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
  );
}

export default App;
