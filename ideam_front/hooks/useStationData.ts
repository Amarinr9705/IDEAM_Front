import { useEffect, useState } from "react";
import { fetchStationData } from "@/lib/api";
import { StationDataPoint, Station } from "@/types/station";
import { DateRange } from "react-day-picker";

export function useStationData(station: Station, dateRange?: DateRange) {
  const [data, setData] = useState<StationDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    async function loadStationData() {
      const codigo = station.codigoestacion;

      setLoading(true);
      setError(undefined);

      try {
        // Use the station's min and max observation dates directly
        // If dateRange is provided, we would need to format it, but for now
        // we use the station's natural date range
        const fromDate = dateRange?.from
          ? station.min_fechaobservacion
          : station.min_fechaobservacion;
        const toDate = dateRange?.to
          ? station.max_fechaobservacion
          : station.max_fechaobservacion;

        const responseData = await fetchStationData(
          codigo,
          fromDate,
          toDate
        );

        if (mounted) {
          setData(responseData);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load station data"));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (station) {
      loadStationData();
    }

    return () => {
      mounted = false;
    };
  }, [station, dateRange]);

  return { data, loading, error };
}
