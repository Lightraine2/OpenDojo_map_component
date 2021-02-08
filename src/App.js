import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Market,
  InfoWindow
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
  const [markets, setMarkers] = React.useState([]);

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
     }}
     >

     </GoogleMap>
  </div>;
}


