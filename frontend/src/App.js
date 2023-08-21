import * as React from "react";
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import ReactMapGL, {Marker,Popup} from 'react-map-gl';
import "./App.css"
import axios from 'axios'

function App() {
  
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX;
  const [pins,setPins] = React.useState([])
  
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
        {pins.map(p=>(
          <>
          <Marker longitude={p.lat} latitude={p.long} anchor="bottom"
          >
             <RoomIcon style={{ color: 'red', fontSize: '20px'}}></RoomIcon>
           </Marker>
           <Popup longitude={p.lat} latitude={p.long}
             anchor="bottom-left" style={{maxWidth: '10px', fontSize: '14px', color:'black'}}>
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
                 <span className="date">1 hour ago</span>
               </div>
           </Popup>
           </>
        ))}

         {/* <Marker longitude={80.216797} latitude={6.028624} anchor="bottom"
         >
            <RoomIcon style={{ color: 'red', fontSize: '20px'}}></RoomIcon>
          </Marker>
          <Popup longitude={80.220978} latitude={6.053519}
            anchor="bottom-left" style={{maxWidth: '10px', fontSize: '14px', color:'black'}}>
              <div className="text">
                <label>Place</label><br/>
                <h4 className="place">Galle Fort</h4><br/>
                <label>Review</label><br/>
                <p className="des">Very beautiful place. I like it </p><br/>
                <label>Rating</label><br/>
                <div className="stars">
                5
                <StarIcon className="star"/>
                </div><br/>
                <label>Information</label><br/>
                <span className="username">Created by -<b>  Ramesh</b></span><br/>
                <span className="date">1 hour ago</span>
              </div>
          </Popup> */}

      </ReactMapGL>
      </div>
  );
}

export default App;
