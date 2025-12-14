import { Station, StationDataPoint } from "@/types/station";

const API_BASE_URL = "http://127.0.0.1:8000/ideam/s54a-sgyg";
const APP_TOKEN = "b2CHangqqSrkv5J2P9I8fP8Qg";

export async function fetchStations(): Promise<Station[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/metadata-estaciones`, {
      headers: {
        "X-App-Token": APP_TOKEN,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.filter(
      (station: Station) => station.latitud && station.longitud
    );
  } catch (error) {
    console.error("Error fetching stations:", error);
    throw error;
  }
}

// Formats date from "2019-07-11T23:10:00.000" to "2019-07-11T23:10:00.0"
function formatDateForApi(dateString: string): string {
  // If the date ends with .XXX (3 digits), replace with .X (1 digit)
  return dateString.replace(/\.\d{3}$/, ".0");
}

export async function fetchStationData(
  codigoEstacion: string,
  min_fechaobservacion: string,
  max_fechaobservacion: string
): Promise<StationDataPoint[]> {
  try {
    const fechaInicio = formatDateForApi(min_fechaobservacion);
    const fechaFin = formatDateForApi(max_fechaobservacion);

    const body = {
      id_estaciones: codigoEstacion,
      columnas: "*",
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };

    const response = await fetch(`${API_BASE_URL}/dataview/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for station ${codigoEstacion}:`, error);
    throw error;
  }
}
