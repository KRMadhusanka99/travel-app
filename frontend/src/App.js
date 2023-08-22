import * as React from "react";
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import ReactMapGL, {Marker,Popup} from 'react-map-gl';
import "./App.css";
import axios from 'axios';
import {format} from 'timeago.js';
import { useState } from "react";

function App() {
  const currentUser = 'Rameh';
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX;
  const [pins,setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [longitude,setLongitude] = useState('80.220978');
  const [latitude,setLatitude] = useState('6.053519');

  React.useEffect(()=>{
    const getPins = async () => {
      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getPins()
  }, []);

  const handleMarkerClick = (id,lat,long) => {
    setCurrentPlaceId(id);
    setLongitude(long);
    setLatitude(lat);
    //console.log(id)
  };

  const handleAddClick = (e) =>{
    // alert(e.lngLat);
    const lat = e.lngLat.lat;
    const long = e.lngLat.lng;
    setNewPlace({
      lat,long
    });
  }

  return (
      <div className="App">
        <ReactMapGL
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: longitude, //79.861244,
          latitude:  latitude, //6.927079,
          zoom:8
        }} 
        onDblClick={handleAddClick}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/kkrmadhu1999/clllb5g5n01eb01plhhxdbv3z"
        // "mapbox://styles/kkrmadhu1999/clll5pig6005201o1g6ky7e75"
      >
        {pins.map(p=>(
          <>
          <Marker longitude={p.long} latitude={p.lat} anchor="bottom"
          >
             <RoomIcon style={{ color: p.username === currentUser ? 'tomato' : 'slateblue', fontSize: '20px', cursor:'pointer'}}
             onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}
             ></RoomIcon>
           </Marker>
           
           {p._id === currentPlaceId ||   (
           <Popup longitude={p.long} latitude={p.lat}
             anchor="bottom-left" style={{maxWidth: '10px', fontSize: '14px', color:'black', cursor:'pointer'}}
             onClose={()=>setCurrentPlaceId(null)}
             >
               <div className="text">
                 <label>Place</label><br/>
                 <h4 className="place">{p.title}</h4><br/>
                 <label>Review</label><br/>
                 <p className="des">{p.desc}</p><br/>
                 <label>Rating</label><br/>
                 <div className="stars">
                 5
                 <StarIcon className="star"/>
                 </div><br/>
                 <label>Information</label><br/>
                 <span className="username">Created by -<b>{p.username}</b></span><br/>
                 <span className="date">{format(p.createdAt)}</span>
               </div>
           </Popup>
           )}
           </>
        ))}
        {newPlace && (
        <Popup longitude={newPlace.long} latitude={newPlace.lat}
             anchor="bottom-left" style={{maxWidth: '10px', fontSize: '14px', color:'black', cursor:'pointer'}}
             onClose={()=>setNewPlace(null)}
             >
              <div className="text">
                 <label>Place</label><br/>
                 <h4 className="place">Galle</h4><br/>
                 <label>Review</label><br/>
                 <p className="des">beatiful</p><br/>
                 <label>Rating</label><br/>
                 <div className="stars">
                 5
                 <StarIcon className="star"/>
                 </div><br/>
                 <label>Information</label><br/>
                 <span className="username">Created by -<b>Ramesh</b></span><br/>
                 <span className="date">1hour ago</span>
               </div>
           </Popup>
      )}
      </ReactMapGL>
      </div>
  );
}

export default App;
