import React, { useEffect, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
function Map({address}) {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    });
    const [position, setPosition] = useState({ lat: 28.6139, lng: 77.2088 });

    useEffect(()=>{
        
        if(isLoaded && address){
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({address:address},(results, status)=>{
                if(status === 'OK' && results[0]){
                    const location = results[0].geometry.location;
                    setPosition({
                        lat: location.lat(),
                        lng: location.lng()
                    })
                }
                else{
                    console.error("failed",status);
                }
            })

        }
    },[isLoaded,address]);
    if (!isLoaded) return <div>Loading map...</div>;
  return (
    <GoogleMap center={position} zoom={15} mapContainerStyle={{height: "100%", width: "100%"}}>
        <MarkerF position={position} mapContainerStyle={{color: 'blue'}}/>
    </GoogleMap>
  ) 
}

export default Map;