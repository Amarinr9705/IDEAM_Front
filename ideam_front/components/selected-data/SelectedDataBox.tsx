import { Station } from "@/types/station";
import { useStationData } from "@/hooks/useStationData";
import { StationRow } from "./StationRow";

interface SelectedDataBoxProps {
  selectedStations: Station[];
}

export function SelectedDataBox({ selectedStations }: SelectedDataBoxProps) {
  const { stationData, loading, errors } = useStationData(selectedStations);

  if (selectedStations.length === 0) {
    return null;
  }

  return (
    <div className="selected-data-box">
      <h3>Datos Seleccionados</h3>

      <table className="estaciones-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ver gráfica</th>
          </tr>
        </thead>

        <tbody>
          {selectedStations.map((station) => (
            <StationRow
              key={station.codigoestacion}
              station={station}
              data={stationData[station.codigoestacion]}
              isLoading={loading[station.codigoestacion] || false}
              error={errors[station.codigoestacion]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
