"use client";

import { memo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { HoverMarker } from "./HoverMarker";
import { useStations } from "@/hooks/useStations";
import { Station } from "@/types/station";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  onSelectStation: (station: Station) => void;
}

function MapViewComponent({ onSelectStation }: MapViewProps) {
  const { stations, loading, error } = useStations();

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Error loading stations: {error.message}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        Cargando estaciones...
      </div>
    );
  }

  return (
    <MapContainer
      center={[4.651795, -74.09462]}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stations.map((station) => (
        <HoverMarker
          key={station.ide}
          station={station}
          onSelect={onSelectStation}
        />
      ))}
    </MapContainer>
  );
}

export const MapView = memo(MapViewComponent);
