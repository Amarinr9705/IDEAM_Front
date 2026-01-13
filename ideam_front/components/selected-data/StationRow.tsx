import { useState } from "react";
import { Station } from "@/types/station";
import { StationChart } from "../chart/StationChart";
import { useStationData } from "@/hooks/useStationData";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { subYears } from "date-fns";
import { DateRange } from "react-day-picker";

interface StationRowProps {
  station: Station;
}

export function StationRow({ station }: StationRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    try {
      if (station.max_fechaobservacion) {

        const maxDate = new Date(station.max_fechaobservacion);
        if (!isNaN(maxDate.getTime())) {
          return {
            from: subYears(maxDate, 1),
            to: maxDate
          };
        }
      }
    } catch (e) {
      console.error("Error parsing date:", e);
    }
    // Fallback
    return {
      from: subYears(new Date(), 1),
      to: new Date()
    };
  });

  // Fetch data for this station with the selected date range
  const { data, loading, error } = useStationData(station, dateRange);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <tr>
        <td className="p-2">{station.nombreestacion}</td>
        <td className="p-2">
          <button onClick={toggleOpen} className="text-blue-600 hover:text-blue-800 underline">
            {isOpen ? "Cerrar" : "Abrir"}
          </button>
        </td>
      </tr>

      {isOpen && (
        <tr className="dropdown-row bg-slate-50">
          <td colSpan={2} className="p-4 border-t border-slate-200">
            <div className="dropdown-content">
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold">Código estación: {station.codigoestacion}</p>
                <DatePickerWithRange
                  date={dateRange}
                  setDate={setDateRange}
                />
              </div>

              {loading && <p className="text-gray-500">Cargando datos...</p>}

              {error && (
                <p className="text-red-500">
                  Error: {error.message}
                </p>
              )}

              {data && !loading && (
                <>
                  <p className="mb-2 text-sm text-gray-600">Total de datos: {data.length}</p>
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
