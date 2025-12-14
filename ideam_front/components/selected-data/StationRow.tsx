import { useState } from "react";
import { Station, StationDataPoint } from "@/types/station";

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
                  <pre style={{ 
                    maxHeight: "400px", 
                    overflow: "auto",
                    fontSize: "12px"
                  }}>
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
