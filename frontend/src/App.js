import * as React from "react";
import RoomIcon from '@mui/icons-material/Room';
import ReactMapGL, {Marker} from 'react-map-gl';

function App() {
  
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX;
  
  return (
      <div className="App">
        <ReactMapGL
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: 80.220978, //79.861244,
          latitude:  6.053519, //6.927079,
          zoom:10
        }}  
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
         <Marker longitude={80.216016} latitude={6.131317} anchor="bottom">
            <RoomIcon fontSize="larget" color="action"></RoomIcon>
          </Marker>
      </ReactMapGL>
      </div>
  );
}

export default App;
