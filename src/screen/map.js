import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow, Data, } from '@react-google-maps/api';
import { useParams } from "react-router-dom";
import { useStream } from 'react-fetch-streams';
// import shipjson from "../json/ship.json";
import history24 from "../json/24.json";
import "./map.css"
import axios from "axios";

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
    keyboardShortcut: false,
    // zoomControlOptions : {
    //     position: google.maps.ControlPosition.RIGHT_CENTER
    // },
    minZoom: 4,
    maxZoom: 22,
    rotateControl: false,
    fullscreenControl: false,
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
    console.log(props.ship);
return<>
    //     {props.ship?.map((value, index) => (
            value.latitude?
            <Marker
                key={index}
                position={{ lat: (parseInt(value.latitude) / 1000) / 60, lng: (parseInt(value.longitude) / 1000) / 60 }}
                // onClick={() => {
                //     window.title.postMessage(value.vName)
                //     console.log(value.vName);
                // }}
                icon={
                    {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        strokeColor: "#FFF",
                        strokeWeight: 1,
                        fillOpacity: 1,
                        fillColor: "#ea3423",
                        scale: 4,
                        rotation: parseInt(value.heading) / 10
                    }
                }
            >
            </Marker>:<></>
        ))}
</>
    // return <>
    //     {props.ship?.Messages?.map((value, index) => (
    //         value.Payload?
    //         <Marker
    //             key={index}
    //             position={{ lat: (parseInt(value.Payload?.Fields[0]?.Value) / 1000) / 60, lng: (parseInt(value.Payload?.Fields[1]?.Value) / 1000) / 60 }}
    //             // onClick={() => {
    //             //     window.title.postMessage(value.vName)
    //             //     console.log(value.vName);
    //             // }}
    //             icon={
    //                 {
    //                     path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    //                     strokeColor: "#FFF",
    //                     strokeWeight: 1,
    //                     fillOpacity: 1,
    //                     fillColor: "#ea3423",
    //                     scale: 4,
    //                     rotation: parseInt(value.Payload?.Fields[3]?.Value) / 10
    //                 }
    //             }
    //         >
    //         </Marker>:<></>
    //     ))}
    // </>

}

function TrackShip(props) {
    const google = window.google;

    return <>
        <Polyline
            path={props.ship.map((value, index) => ({ lat: (parseInt(value.latitude) / 1000) / 60, lng: (parseInt(value.longitude) / 1000) / 60 }))}
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
                        fillColor: index === 0 ? "#ea3423" : "#00F",
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
                fillColor: "#00F",
                scale: 4,
                rotation: parseInt("0") / 10
            }
        }
    >
    </Marker>
}

function MyMap() {
    const [center, setCenter] = useState({ lat: 7.878978, lng: 98.398392 })
    const [allship, setAllShip] = useState([])
    let { Type } = useParams();
    const [geoJsonData, setgeoJsonData] = useState('');
    const [map, setMap] = React.useState(null)
    const onMapLoad = useCallback((map) => setMap(map), []);

    const handleChange = (event) => {
        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });
        setCenter({ lat: map.getCenter().lat(), lng: map.getCenter().lng() })
        setgeoJsonData(event.target.value);
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDIMEOPBeQ-rHzg5kWLRhWyBPlpjrDSfz4'
        //AIzaSyDIMEOPBeQ-rHzg5kWLRhWyBPlpjrDSfz4
    })

    const onNext = useCallback(async res => {
        const data = await res.json();
        setAllShip(data);
    }, [setAllShip]);
    useStream('https://raw.githubusercontent.com/ukkpaapay/EtnecaMap/main/src/json/ship.json', {onNext});
    // async function getUser() {
    //     try {
    //         const response = await axios.get('https://isatdatapro.orbcomm.com/GLGW/2/RestMessages.svc/JSON/get_return_messages/?access_id=70001969&password=UKSDKUXZ&start_utc=2016-10-12%2010:00:05&include_raw_payload=true');
    //         setAllShip(response.data)
    //         // console.log(response.data);
    //         response.data.Messages.map((value, index) => {
    //             // if (value.Payload) {
    //                 console.log(value)
    //             // }
    //         })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    useEffect(() => {
        // getUser()
        onNext()
        if (map) {
            map.data.loadGeoJson(geoJsonData)
            map.data.setStyle({
                fillColor: 'transparent',
                strokeWeight: 1
            });
        }
    }, [geoJsonData]);

    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])
    return isLoaded ?
        <div className="parent">
            <GoogleMap
                options={mapOptions}
                mapContainerStyle={containerStyle}
                // center={Type === 'all' ? center : {
                //     lat: (parseInt(history24[0].latitude) / 1000) / 60, lng: (parseInt(history24[0].longitude) / 1000) / 60
                // }}
                center={center}
                zoom={7}
                onLoad={onMapLoad}
                onUnmount={onUnmount}
            >
                <AllShip ship={allship} />
                {/* {Type === 'one' ? <OneShip /> : <></>} */}
                {/* <TrackShip ship={history24} /> */}

            </GoogleMap>
            <div className="inner"><select className="select" value={geoJsonData} onChange={handleChange}>
                {kml.map((value, index) => <option key={index} value={value.kml}>{value.name}</option>)}
            </select>
            </div>
        </div>
        : <></>
}

export default React.memo(MyMap)