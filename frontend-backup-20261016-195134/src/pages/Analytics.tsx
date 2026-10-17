import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Building,
  Sensor,
  TrafficData,
  SensorWebSocketData,
} from "../types/city";

import {
  getBuildings,
  getSensors,
  getTraffic,
} from "../services/api";

import {
  connectWebSocket,
} from "../services/websocket";

import {
  useLocation,
} from "../context/LocationContext";

function Analytics() {
  const { selectedLocation } = useLocation();

  const [buildings, setBuildings] =
    useState<Building[]>([]);

  const [sensors, setSensors] =
    useState<Sensor[]>([]);

  const [traffic, setTraffic] =
    useState<TrafficData[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [lastUpdate, setLastUpdate] =
    useState<Date | null>(null);

  /*
   * Load the latest backend data whenever
   * the selected Google location changes.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      try {
        setLoading(true);

        const [
          buildingData,
          sensorData,
          trafficData,
        ] = await Promise.all([
          getBuildings(),
          getSensors(),
          getTraffic(),
        ]);

        if (cancelled) {
          return;
        }

        setBuildings(buildingData || []);
        setSensors(sensorData || []);
        setTraffic(trafficData || []);
        setLastUpdate(new Date());
      } catch (error) {
        console.error(
          "Analytics API error:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, [
    selectedLocation.latitude,
    selectedLocation.longitude,
  ]);

  /*
   * Subscribe to live sensor WebSocket updates.
   */
  useEffect(() => {
    const disconnect =
      connectWebSocket(
        (data: SensorWebSocketData) => {
          setSensors((currentSensors) => {
            const existingIndex =
              currentSensors.findIndex(
                (sensor) =>
                  sensor.id === data.id
              );

            if (existingIndex === -1) {
              return [
                ...currentSensors,
                {
                  id: data.id,
                  name: data.name,
                  type: data.type,
                  value: Number(data.value),
                  unit: data.unit,
                  status:
                    data.status || "ACTIVE",
                  xPosition:
                    data.xPosition || 0,
                  zPosition:
                    data.zPosition || 0,
                },
              ];
            }

            const updatedSensors =
              [...currentSensors];

            updatedSensors[
              existingIndex
            ] = {
              ...updatedSensors[
                existingIndex
              ],
              value: Number(data.value),
              status:
                data.status ||
                updatedSensors[
                  existingIndex
                ].status,
            };

            return updatedSensors;
          });

          setLastUpdate(new Date());
        }
      );

    return () => {
      disconnect();
    };
  }, []);

  const totalVehicles =
    useMemo(() => {
      return traffic.reduce(
        (sum, item) =>
          sum +
          Number(
            item.vehicleCount || 0
          ),
        0
      );
    }, [traffic]);

  const averageSpeed =
    useMemo(() => {
      if (traffic.length === 0) {
        return 0;
      }

      const speeds =
        traffic
          .map((item) =>
            Number(
              item.averageSpeed || 0
            )
          )
          .filter(
            (speed) => speed > 0
          );

      if (speeds.length === 0) {
        return 0;
      }

      return Math.round(
        speeds.reduce(
          (sum, speed) =>
            sum + speed,
          0
        ) / speeds.length
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

          <p
            style={{
              marginTop: "6px",
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            📍 {selectedLocation.address}
          </p>
        </div>

        <div
          style={{
            padding: "8px 14px",
            borderRadius: "20px",
            background: "#dcfce7",
            color: "#166534",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          ● LIVE
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

        <div className="location-coordinates">

          <span>
            Latitude
          </span>

          <strong>
            {selectedLocation.latitude.toFixed(
              6
            )}
          </strong>

          <span>
            Longitude
          </span>

          <strong>
            {selectedLocation.longitude.toFixed(
              6
            )}
          </strong>

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
            Live environmental and
            infrastructure monitoring
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

      <div
        style={{
          marginTop: "24px",
          padding: "12px 16px",
          borderRadius: "10px",
          background: "#f8fafc",
          color: "#64748b",
          fontSize: "12px",
        }}
      >
        {loading
          ? "Loading latest analytics..."
          : lastUpdate
          ? `Last live update: ${lastUpdate.toLocaleTimeString()}`
          : "Waiting for live updates..."}
      </div>

    </div>
  );
}

export default Analytics;