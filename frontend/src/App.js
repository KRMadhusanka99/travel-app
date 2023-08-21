import * as React from "react";
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import ReactMapGL, {Marker,Popup} from 'react-map-gl';

function App() {
  
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX;
  
  return (
      <div className="App">
        <ReactMapGL
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: 80.220978, //79.861244,
          latitude:  6.053519, //6.927079,
          zoom:8
        }}  
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/kkrmadhu1999/clllb5g5n01eb01plhhxdbv3z"
        // "mapbox://styles/kkrmadhu1999/clll5pig6005201o1g6ky7e75"
      >
         <Marker longitude={80.216797} latitude={6.028624} anchor="bottom"
         >
            <RoomIcon style={{ color: 'red', fontSize: '20px'}}></RoomIcon>
          </Marker>
          <Popup longitude={80.220978} latitude={6.053519}
            anchor="bottom-left" style={{maxWidth: '10px', fontSize: '14px', color:'black'}}>
              <div className="text">
                <label>Place</label><br/>
                <h4 className="place">Galle Fort</h4><br/>
                <label>Review</label><br/>
                <p>Very beautiful place. I like it </p><br/>
                <label>Rating</label><br/>
                <div className="stars">
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                </div><br/>
                <label>Information</label><br/>
                <span className="username">Created by -<b>  Ramesh</b></span><br/>
                <span className="date">1 hour ago</span>
              </div>
          </Popup>
      </ReactMapGL>
      </div>
  );
}

export default App;
