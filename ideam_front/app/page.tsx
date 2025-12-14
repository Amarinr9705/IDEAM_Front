"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Station } from "@/types/station";
import { SelectedDataBox } from "@/components/selected-data/SelectedDataBox";

// Dynamic import para evitar problemas de SSR con Leaflet
const MapView = dynamic(
  () => import("@/components/map/MapView").then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => <div style={{ padding: "20px" }}>Cargando mapa...</div>,
  }
);

export default function Home() {
  const [selectedStations, setSelectedStations] = useState<Station[]>([]);

  const handleSelectStation = useCallback((station: Station) => {
    setSelectedStations((prev) => {
      // Evitar duplicados
      const exists = prev.some(
        (s) => s.codigoestacion === station.codigoestacion
      );
      if (exists) {
        return prev;
      }
      return [...prev, station];
    });
  }, []);

  return (
    <div className="layout">
      <SelectedDataBox selectedStations={selectedStations} />
      <MapView onSelectStation={handleSelectStation} />
    </div>
  );
}
