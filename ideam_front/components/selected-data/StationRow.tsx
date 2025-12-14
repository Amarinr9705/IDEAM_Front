import { useState } from "react";
import { Station, StationDataPoint } from "@/types/station";
import { StationChart } from "../chart/StationChart";

interface StationRowProps {
  station: Station;
  data: StationDataPoint[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

export function StationRow({ station, data, isLoading, error }: StationRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <tr>
        <td>{station.nombreestacion}</td>
        <td>
          <button onClick={toggleOpen}>
            {isOpen ? "Cerrar" : "Abrir"}
          </button>
        </td>
      </tr>

      {isOpen && (
        <tr className="dropdown-row">
          <td colSpan={2}>
            <div className="dropdown-content">
              <p>Código estación: {station.codigoestacion}</p>

              {isLoading && <p>Cargando datos...</p>}

              {error && (
                <p style={{ color: "red" }}>
                  Error: {error.message}
                </p>
              )}

              {data && !isLoading && (
                <>
                  <p>Total de datos: {data.length}</p>
                  <div style={{ width: "100%", height: "450px" }}>
                    <StationChart data={data} />
                  </div>
                </>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
