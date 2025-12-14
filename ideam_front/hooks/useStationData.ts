import { useEffect, useState } from "react";
import { fetchStationData } from "@/lib/api";
import { StationDataPoint, Station } from "@/types/station";

export function useStationData(selectedStations: Station[]) {
  const [stationData, setStationData] = useState<Record<string, StationDataPoint[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, Error>>({});

  useEffect(() => {
    let mounted = true;

    async function loadStationData(station: Station) {
      const codigo = station.codigoestacion;

      // Skip if already loaded or loading
      if (stationData[codigo] || loading[codigo]) {
        return;
      }

      // Set loading state
      setLoading(prev => ({ ...prev, [codigo]: true }));

      try {
        const data = await fetchStationData(
          codigo,
          station.min_fechaobservacion,
          station.max_fechaobservacion
        );

        if (mounted) {
          setStationData(prev => ({
            ...prev,
            [codigo]: data
          }));
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[codigo];
            return newErrors;
          });
        }
      } catch (err) {
        if (mounted) {
          setErrors(prev => ({
            ...prev,
            [codigo]: err instanceof Error ? err : new Error("Failed to load station data")
          }));
        }
      } finally {
        if (mounted) {
          setLoading(prev => ({ ...prev, [codigo]: false }));
        }
      }
    }

    // Load data for all selected stations
    selectedStations.forEach(station => {
      loadStationData(station);
    });

    return () => {
      mounted = false;
    };
  }, [selectedStations]);

  return { stationData, loading, errors };
}
