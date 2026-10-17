import type {
  Building,
  Sensor,
  TrafficData,
} from "../types/city";

const API_BASE_URL = "http://localhost:8080/api";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as T;
}

// ================================
// BUILDINGS
// ================================

export async function getBuildings(): Promise<Building[]> {
  return fetchAPI<Building[]>("/buildings");
}

// ================================
// SENSORS
// ================================

export async function getSensors(): Promise<Sensor[]> {
  return fetchAPI<Sensor[]>("/sensors");
}

// ================================
// TRAFFIC
// ================================

export async function getTraffic(): Promise<TrafficData[]> {
  return fetchAPI<TrafficData[]>("/traffic");
}