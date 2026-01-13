import { Station } from "@/types/station";
import { StationRow } from "./StationRow";

interface SelectedDataBoxProps {
  selectedStations: Station[];
}

export function SelectedDataBox({ selectedStations }: SelectedDataBoxProps) {

  if (selectedStations.length === 0) {
    return null;
  }

  return (
    <div className="selected-data-box p-4 bg-white shadow-lg rounded-lg fixed bottom-4 right-4 z-[1000] max-h-[600px] overflow-auto" style={{ width: "500px" }}>
      <h3 className="font-bold text-lg mb-2">Datos Seleccionados</h3>

      <table className="estaciones-table w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Nombre</th>
            <th className="p-2">Ver gráfica</th>
          </tr>
        </thead>

        <tbody>
          {selectedStations.map((station) => (
            <StationRow
              key={station.codigoestacion}
              station={station}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
