import { memo, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "../Button/Button";
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

function MapView({ onSelectData }) {
  const [estaciones, setEstaciones] = useState([]);

  const position = [4.651795, -74.09462];

  useEffect(() => {
    async function fetchAllStations() {
        const url = `http://127.0.0.1:8000/ideam/s54a-sgyg/metadata-estaciones`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-App-Token": "b2CHangqqSrkv5J2P9I8fP8Qg",
            Accept: "application/json"
          },

        });
        const data = await response.json();
        setEstaciones(data);
      }
    fetchAllStations();
  }, []);
  


  return (
    <MapContainer
      center={position}
      zoom={6}
      style={{ height: "100vh", width: "100%", marginLeft: "auto" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
      {estaciones.map((estacion, index) => {
        const lat = estacion.latitud;
        const lon = estacion.longitud;
        if (!lat || !lon) return null;

        return (
          <Marker key={index} position={[lat, lon]}>
            <Popup>
              <strong>{estacion.nombreestacion}</strong>
              <br />
              Primer observación: {estacion.min_fechaobservacion}
              <br/>
              Última observación: {estacion.max_fechaobservacion}
              <br />
              Número de datos: {estacion.count_fechaobservacion}
              <br />
              <Button onClick={() => onSelectData(estacion)}>Seleccionar</Button>
            </Popup>
          </Marker>
        );
      })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default memo(MapView);