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
  //const [newPlace, setNewPlace] = useState(null);
  
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

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    console.log(id)
  };

  const handleAddClick = (e) =>{
    console.log(e);
  }

  return (
      <div className="App">
        <ReactMapGL
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: 80.220978, //79.861244,
          latitude:  6.053519, //6.927079,
          zoom:8,
          
        }}  
        style={{width: "100vw", height: "100vh",ondblclick:{handleAddClick}}}
        mapStyle="mapbox://styles/kkrmadhu1999/clllb5g5n01eb01plhhxdbv3z"
        // "mapbox://styles/kkrmadhu1999/clll5pig6005201o1g6ky7e75"
      >
        {pins.map(p=>(
          <>
          <Marker longitude={p.long} latitude={p.lat} anchor="bottom"
          >
             <RoomIcon style={{ color: p.username === currentUser ? 'tomato' : 'slateblue', fontSize: '20px', cursor:'pointer'}}
             onClick={()=>handleMarkerClick(p._id)}
             ></RoomIcon>
           </Marker>
           
           {p._id === currentPlaceId || 
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
           }
           </>
        ))}
        {/* <Popup longitude={} latitude={}
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
               </div>hello
           </Popup> */}

      </ReactMapGL>
      </div>
  );
}

export default App;
