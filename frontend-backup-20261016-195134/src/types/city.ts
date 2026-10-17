// ==========================================
// BUILDING
// ==========================================

export interface Building {
  id: number;

  name: string;

  height: number;

  width: number;

  depth: number;

  xPosition: number;

  zPosition: number;

  color?: string;
}


// ==========================================
// SENSOR
// ==========================================

export interface Sensor {
  id: number;

  name: string;

  type: string;

  value: number;

  unit: string;

  xPosition: number;

  zPosition: number;

  status?: string;
}


// ==========================================
// TRAFFIC
// ==========================================

export interface TrafficData {
  id: number;

  vehicleCount: number;

  averageSpeed: number;

  roadName: string;

  congestionLevel: string;

  timestamp?: string;

  location?: string;

  xPosition?: number;

  zPosition?: number;
}


// ==========================================
// WEBSOCKET SENSOR DATA
// ==========================================

export interface SensorWebSocketData {
  id: number;

  name: string;

  type: string;

  value: number;

  unit: string;

  status?: string;

  xPosition?: number;

  yPosition?: number;

  zPosition?: number;
}


// ==========================================
// SELECTED GOOGLE LOCATION
// ==========================================

export interface SelectedLocation {
  name: string;

  address: string;

  latitude: number;

  longitude: number;

  placeId?: string;
}