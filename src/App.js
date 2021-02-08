import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer
} from "@react-google-maps/api";
import {formatRelative} from "date-fns";
import "@reach/combobox/styles.css"

import mapStyles from './mapStyles';

require('dotenv').config();

const libraries= ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
}

const center = {
  lat: 51.538120,
  lng: -2.151510,

};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

if (loadError) return "Error Loading Maps";
if (!isLoaded) return "Loading Maps";

  //console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  //console.log(mapStyles);
  return <div>
    <GoogleMap mapContainerStyle={mapContainerStyle}
     zoom={12} 
     center={center}
     options={options}
     onClick={(event) => {
       //this is dropping a pin
       setMarkers(current => [
         ...current,
         {
           lat: event.latLng.lat(),
           lng: event.latLng.lng(),
           time: new Date(),
         },
       ]);
//       console.log(event)
// that event object contains the co-ords of the marker. stuff we need to implement
// Only 1 marker at a time
// Clear markers - reset button
// 'save' location > persist to database

     }}
     >
{markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: `/gi2.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
     </GoogleMap>
  </div>;
}


