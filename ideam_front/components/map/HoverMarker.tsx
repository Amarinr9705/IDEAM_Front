import { useState, useEffect, useRef } from "react";
import { CircleMarker, Popup } from "react-leaflet";
import { Station } from "@/types/station";

interface HoverMarkerProps {
  station: Station;
  onSelect: (station: Station) => void;
}

export function HoverMarker({ station, onSelect }: HoverMarkerProps) {
  const [popupOpacity, setPopupOpacity] = useState(1);
  const popupRef = useRef<L.Popup>(null);

  useEffect(() => {
    if (popupRef.current) {
      const popupElement = popupRef.current.getElement();
      if (popupElement) {
        popupElement.style.opacity = String(popupOpacity);
        popupElement.style.transition = 'opacity 0.3s ease';
      }
    }
  }, [popupOpacity]);

  return (
    <CircleMarker
      center={[station.latitud, station.longitud]}
      radius={8}
      fillColor="#0077ff"
      color="#0055aa"
      weight={1}
      fillOpacity={0.8}
      eventHandlers={{
        mouseover: (e) => {
          e.target.openPopup();
        },
      }}
    >
      <Popup
        ref={popupRef}
        autoPan={false}
        closeButton={true}
      >
        <div
          style={{ minWidth: 200 }}
          onMouseEnter={() => setPopupOpacity(1)}
          onMouseLeave={() => setPopupOpacity(0.5)}
        >
          <strong>{station.nombreestacion}</strong>
          <br />
          Primer observación: {station.min_fechaobservacion}
          <br />
          Última observación: {station.max_fechaobservacion}
          <br />
          Número de datos: {station.count_fechaobservacion}
          <br />
          <br />
          <button
            onClick={() => onSelect(station)}
            style={{
              padding: "6px 10px",
              background: "#0077ff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Seleccionar
          </button>
        </div>
      </Popup>
    </CircleMarker>
  );
}

