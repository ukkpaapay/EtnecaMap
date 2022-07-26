import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, KmlLayer, Marker, Polyline, InfoWindow, } from '@react-google-maps/api';
import { useParams } from "react-router-dom";
import shipjson from "../json/ship.json";
import history24 from "../json/24.json";
import "./map.css"

const containerStyle = {
    width: '100%',
    height: '100vh',
};
const mapOptions = {
    streetViewControl: false,
    scaleControl: false,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    keyboardShortcut:false,
    // zoomControlOptions : {
    //     position: google.maps.ControlPosition.RIGHT_CENTER
    // },
    minZoom: 4,
    maxZoom: 22,
    rotateControl: false,
    fullscreenControl: false,
};
const center = {
    lat: 7.878978, lng: 98.398392
};
const kml = [
    { id: 0, name: "ไม่มี", kml: 'null' },
    { id: 1, name: "buffer05_final", kml: 'https://raw.githubusercontent.com/ukkpaapay/EtnecaMap/main/src/geojson/buffer05_final.geojson' },
    { id: 2, name: "marine_NPRK_1984", kml: 'https://raw.githubusercontent.com/ukkpaapay/EtnecaMap/main/src/geojson/marine_NPRK_1984.geojson' },
    { id: 3, name: "merge_เขตทะเลชายฝั่ง", kml: 'https://raw.githubusercontent.com/ukkpaapay/EtnecaMap/main/src/geojson/merge_%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%A5%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%9D%E0%B8%B1%E0%B9%88%E0%B8%87.geojson' },
    { id: 4, name: "ปิดอ่าวตัวก", kml: 'https://raw.githubusercontent.com/ukkpaapay/EtnecaMap/main/src/geojson/%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%AD%E0%B9%88%E0%B8%B2%E0%B8%A7%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%81_310560.geojson' },
    { id: 5, name: "เขตไหล่ทวีป-เขตเศรษฐกิจจำเพาะ", kml: 'https://raw.githubusercontent.com/ukkpaapay/EtnecaMap/main/src/geojson/%E0%B9%80%E0%B8%82%E0%B8%95%E0%B9%84%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%97%E0%B8%A7%E0%B8%B5%E0%B8%9B-%E0%B9%80%E0%B8%82%E0%B8%95%E0%B9%80%E0%B8%A8%E0%B8%A3%E0%B8%A9%E0%B8%90%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%88%E0%B8%B3%E0%B9%80%E0%B8%9E%E0%B8%B2%E0%B8%B0.geojson' },
    { id: 6, name: "เส้นไหล่ทวีป_NEW", kml: 'https://raw.githubusercontent.com/ukkpaapay/EtnecaMap/main/src/geojson/%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%97%E0%B8%A7%E0%B8%B5%E0%B8%9B_NEW.geojson' },
]
function AllShip(props) {
    const google = window.google;
    return <>
        {props.ship.map((value, index) => (

            <Marker
                key={index}
                position={{ lat: (parseInt(value.latitude) / 1000) / 60, lng: (parseInt(value.longitude) / 1000) / 60 }}
                onClick={() => {
                    window.title.postMessage(value.vName)
                }}
                icon={
                    {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        strokeColor: "#FFF",
                        strokeWeight: 1,
                        fillOpacity: 1,
                        fillColor: value.terminalStatus == "ปกติ" ? "#00F" : "#ea3423",
                        scale: 4,
                        rotation: parseInt(value.heading) / 10
                    }
                }
            >
            </Marker>
        ))}
    </>

}

function TrachShip(props) {
    const google = window.google;
    
    return <>
        <Polyline
            path={props.ship.map((value,index)=>({ lat: (parseInt(value.latitude) / 1000) / 60, lng: (parseInt(value.longitude) / 1000) / 60 }))}
        />
        {props.ship.map((value, index) => (
            <Marker
            key={index}
            position={{ lat: (parseInt(value.latitude) / 1000) / 60, lng: (parseInt(value.longitude) / 1000) / 60 }}
            onClick={() => {
                window.title.postMessage(value.vName)
            }}
            icon={
                {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    strokeColor: "#FFF",
                    strokeWeight: 1,
                    fillOpacity: 1,
                    fillColor: index == 0 ? "#ea3423" : "#00F",
                    scale: 4,
                    rotation: parseInt(value.heading) / 10
                }
            }
        >
        </Marker>
        ))}
    </>
}

function OneShip() {
    const google = window.google;
return <Marker
position={{ lat: (parseInt("574353") / 1000) / 60, lng: (parseInt("5804153") / 1000) / 60 }}
icon={
    {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeColor: "#FFF",
        strokeWeight: 1,
        fillOpacity: 1,
        fillColor:"#00F",
        scale: 4,
        rotation: parseInt("0") / 10
    }
}
>
</Marker>
}

function MyMap() {
    let { Type, Geojson } = useParams();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDIMEOPBeQ-rHzg5kWLRhWyBPlpjrDSfz4'
        //AIzaSyDIMEOPBeQ-rHzg5kWLRhWyBPlpjrDSfz4
    })

    const [, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        map.data.loadGeoJson(kml[parseInt(Geojson)].kml);
        map.data.setStyle({
            fillColor: 'transparent',
            strokeWeight: 1
        });
        console.log(kml[parseInt(Geojson)].kml);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])

    return isLoaded ?
        <div>
            <GoogleMap
                options={mapOptions}
                mapContainerStyle={containerStyle}
                center={Type == 'all'?{
                    lat: 7.878978, lng: 98.398392
                }:{
                    lat: (parseInt(history24[0].latitude) / 1000) / 60, lng: (parseInt(history24[0].longitude) / 1000) / 60
                }}
                zoom={7}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {Type == 'one'?<OneShip/>:<></>}
                {Type == 'track'?<TrachShip ship={history24} />:<></>}
                {Type == 'all'?<AllShip ship={shipjson} />:<></>}
                
                
            </GoogleMap>
        </div> : <></>
}

export default React.memo(MyMap)