import type {
  Building,
  Sensor,
  TrafficData,
} from "../types/city";

const API_BASE_URL = "http://localhost:8080/api";

async function fetchAPI<T>(
  endpoint: string
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`
  );

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export const getBuildings = async (): Promise<
  Building[]
> => {
  return fetchAPI<Building[]>("/buildings");
};

export const getSensors = async (): Promise<
  Sensor[]
> => {
  return fetchAPI<Sensor[]>("/sensors");
};

export const getTraffic = async (): Promise<
  TrafficData[]
> => {
  return fetchAPI<TrafficData[]>("/traffic");
};