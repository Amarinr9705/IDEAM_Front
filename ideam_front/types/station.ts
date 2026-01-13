export interface Station {
  ide: string;
  codigoestacion: string;
  nombreestacion: string;
  latitud: number;
  longitud: number;
  min_fechaobservacion: string;
  max_fechaobservacion: string;
  count_fechaobservacion: number;
}

export interface StationDataPoint {
  fechaobservacion: string;
  valorobservado: number;
  [key: string]: unknown;
}

export interface StationAPIResponse {
  [key: string]: StationDataPoint[];
}
