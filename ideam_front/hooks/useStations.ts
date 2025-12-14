import { useEffect, useState } from "react";
import { fetchStations } from "@/lib/api";
import { Station } from "@/types/station";

export function useStations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadStations() {
      try {
        setLoading(true);
        const data = await fetchStations();
        
        if (mounted) {
          setStations(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to load stations"));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStations();

    return () => {
      mounted = false;
    };
  }, []);

  return { stations, loading, error };
}
