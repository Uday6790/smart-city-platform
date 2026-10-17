import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Building,
  Sensor,
  TrafficData,
} from "../types/city";

import {
  getBuildings,
  getSensors,
  getTraffic,
} from "../services/api";

import {
  useLocation,
} from "../context/LocationContext";

function Analytics() {
  const {
    selectedLocation,
  } = useLocation();

  const [buildings, setBuildings] =
    useState<Building[]>([]);

  const [sensors, setSensors] =
    useState<Sensor[]>([]);

  const [traffic, setTraffic] =
    useState<TrafficData[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadData =
      async () => {
        try {
          setLoading(true);

          const [
            buildingData,
            sensorData,
            trafficData,
          ] =
            await Promise.all([
              getBuildings(),
              getSensors(),
              getTraffic(),
            ]);

          setBuildings(
            buildingData || []
          );

          setSensors(
            sensorData || []
          );

          setTraffic(
            trafficData || []
          );

        } catch (error) {
          console.error(
            "Analytics error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    void loadData();
  }, []);

  const totalVehicles =
    useMemo(
      () =>
        traffic.reduce(
          (sum, item) =>
            sum +
            Number(
              item.vehicleCount || 0
            ),
          0
        ),
      [traffic]
    );

  const averageSpeed =
    useMemo(() => {
      if (traffic.length === 0) {
        return 0;
      }

      return Math.round(
        traffic.reduce(
          (sum, item) =>
            sum +
            Number(
              item.averageSpeed || 0
            ),
          0
        ) / traffic.length
      );
    }, [traffic]);

  const activeSensors =
    sensors.filter(
      (sensor) =>
        (
          sensor.status ||
          "ACTIVE"
        ).toUpperCase() ===
        "ACTIVE"
    ).length;

  if (loading) {
    return (
      <div className="page-container">

        <div className="page-header">

          <h1>
            📊 Analytics
          </h1>

          <p>
            Loading analytics...
          </p>

        </div>

        <div className="loading-message">
          Loading Smart City analytics...
        </div>

      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">

        <div>

          <h1>
            📊 Analytics
          </h1>

          <p>
            Smart City analytics for{" "}
            <strong>
              {selectedLocation.name}
            </strong>
          </p>

        </div>

      </div>

      <div className="location-data-notice">

        <div>

          <span className="section-kicker">
            ANALYTICS LOCATION
          </span>

          <h3>
            {selectedLocation.name}
          </h3>

          <p>
            {selectedLocation.address}
          </p>

        </div>

      </div>

      <div className="sensor-summary">

        <div className="summary-card">

          <span>
            🏢 Buildings
          </span>

          <strong>
            {buildings.length}
          </strong>

        </div>

        <div className="summary-card">

          <span>
            📡 Active Sensors
          </span>

          <strong>
            {activeSensors}
          </strong>

        </div>

        <div className="summary-card">

          <span>
            🚗 Vehicles
          </span>

          <strong>
            {totalVehicles}
          </strong>

        </div>

        <div className="summary-card">

          <span>
            ⚡ Avg Speed
          </span>

          <strong>
            {averageSpeed} km/h
          </strong>

        </div>

      </div>

      <div className="sensor-grid">

        <div className="sensor-card">

          <h3>
            Infrastructure
          </h3>

          <p>
            Smart City building records
          </p>

          <div className="sensor-value">
            <strong>
              {buildings.length}
            </strong>

            <span>
              buildings
            </span>
          </div>

        </div>

        <div className="sensor-card">

          <h3>
            Connected Sensors
          </h3>

          <p>
            Environmental and infrastructure
            monitoring
          </p>

          <div className="sensor-value">
            <strong>
              {sensors.length}
            </strong>

            <span>
              sensors
            </span>
          </div>

        </div>

        <div className="sensor-card">

          <h3>
            Traffic Network
          </h3>

          <p>
            Traffic monitoring records
          </p>

          <div className="sensor-value">
            <strong>
              {traffic.length}
            </strong>

            <span>
              records
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;