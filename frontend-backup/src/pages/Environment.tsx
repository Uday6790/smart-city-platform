import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Sensor,
  SensorWebSocketData,
} from "../types/city";

import {
  getSensors,
} from "../services/api";

import {
  connectWebSocket,
} from "../services/websocket";

import {
  useLocation,
} from "../context/LocationContext";

function Environment() {
  const { selectedLocation } =
    useLocation();

  const [sensors, setSensors] =
    useState<Sensor[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [lastUpdate, setLastUpdate] =
    useState<Date | null>(null);

  /*
   * Reload sensors when the selected
   * Google location changes.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadSensors() {
      try {
        setLoading(true);

        const data =
          await getSensors();

        if (cancelled) {
          return;
        }

        setSensors(data || []);
        setLastUpdate(new Date());

      } catch (error) {
        console.error(
          "Environment API error:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSensors();

    return () => {
      cancelled = true;
    };
  }, [
    selectedLocation.latitude,
    selectedLocation.longitude,
  ]);

  /*
   * Receive real-time sensor changes.
   */
  useEffect(() => {
    const disconnect =
      connectWebSocket(
        (data: SensorWebSocketData) => {

          setSensors(
            (currentSensors) => {

              const existingIndex =
                currentSensors.findIndex(
                  (sensor) =>
                    sensor.id === data.id
                );

              if (
                existingIndex === -1
              ) {
                return [
                  ...currentSensors,
                  {
                    id: data.id,
                    name:
                      data.name,
                    type:
                      data.type,
                    value:
                      Number(
                        data.value
                      ),
                    unit:
                      data.unit,
                    status:
                      data.status ||
                      "ACTIVE",
                    xPosition:
                      data.xPosition ||
                      0,
                    zPosition:
                      data.zPosition ||
                      0,
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
                value:
                  Number(
                    data.value
                  ),
                status:
                  data.status ||
                  updatedSensors[
                    existingIndex
                  ].status,
              };

              return updatedSensors;
            }
          );

          setLastUpdate(
            new Date()
          );
        }
      );

    return () => {
      disconnect();
    };
  }, []);

  const temperatureSensors =
    sensors.filter(
      (sensor) =>
        sensor.type
          ?.toUpperCase()
          .includes("TEMPERATURE")
    );

  const airSensors =
    sensors.filter(
      (sensor) => {
        const type =
          sensor.type
            ?.toUpperCase() || "";

        return (
          type.includes("AIR") ||
          type.includes("AQI") ||
          type.includes("QUALITY")
        );
      }
    );

  const noiseSensors =
    sensors.filter(
      (sensor) =>
        sensor.type
          ?.toUpperCase()
          .includes("NOISE")
    );

  const averageTemperature =
    useMemo(() => {

      if (
        temperatureSensors.length ===
        0
      ) {
        return "0.0";
      }

      const total =
        temperatureSensors.reduce(
          (sum, sensor) =>
            sum +
            Number(
              sensor.value || 0
            ),
          0
        );

      return (
        total /
        temperatureSensors.length
      ).toFixed(1);

    }, [temperatureSensors]);

  const averageAirQuality =
    useMemo(() => {

      if (
        airSensors.length === 0
      ) {
        return 0;
      }

      const total =
        airSensors.reduce(
          (sum, sensor) =>
            sum +
            Number(
              sensor.value || 0
            ),
          0
        );

      return Math.round(
        total /
        airSensors.length
      );

    }, [airSensors]);

  const averageNoise =
    useMemo(() => {

      if (
        noiseSensors.length === 0
      ) {
        return 0;
      }

      const total =
        noiseSensors.reduce(
          (sum, sensor) =>
            sum +
            Number(
              sensor.value || 0
            ),
          0
        );

      return Math.round(
        total /
        noiseSensors.length
      );

    }, [noiseSensors]);

  return (
    <div className="page-container">

      <div className="page-header">

        <div>

          <h1>
            🌱 Environment
          </h1>

          <p>
            Real-time environmental
            monitoring for{" "}
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
            SELECTED LOCATION
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
            🌡️ Temperature
          </span>

          <strong>
            {averageTemperature} °C
          </strong>

        </div>

        <div className="summary-card">

          <span>
            🌫️ Air Quality
          </span>

          <strong>
            {averageAirQuality} AQI
          </strong>

        </div>

        <div className="summary-card">

          <span>
            🔊 Noise
          </span>

          <strong>
            {averageNoise} dB
          </strong>

        </div>

        <div className="summary-card">

          <span>
            📡 Sensors
          </span>

          <strong>
            {sensors.length}
          </strong>

        </div>

      </div>

      <div className="sensor-grid">

        {sensors.map(
          (sensor) => (

            <div
              className="sensor-card"
              key={sensor.id}
            >

              <h3>
                {sensor.name}
              </h3>

              <p>
                {sensor.type}
              </p>

              <div className="sensor-value">

                <strong>
                  {sensor.value}
                </strong>

                <span>
                  {sensor.unit}
                </span>

              </div>

              <div
                className="sensor-footer"
              >

                📍{" "}
                {selectedLocation.name}

              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color:
                    (
                      sensor.status ||
                      "ACTIVE"
                    ).toUpperCase() ===
                    "ACTIVE"
                      ? "#16a34a"
                      : "#dc2626",
                }}
              >
                ●{" "}
                {(
                  sensor.status ||
                  "ACTIVE"
                ).toUpperCase()}
              </div>

            </div>

          )
        )}

      </div>

      {!loading &&
        sensors.length === 0 && (
          <div
            className="loading-message"
            style={{
              marginTop: "20px",
            }}
          >
            No environmental sensors
            available.
          </div>
        )}

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
          ? "Loading latest sensor data..."
          : lastUpdate
          ? `Last live update: ${lastUpdate.toLocaleTimeString()}`
          : "Waiting for live sensor updates..."}
      </div>

    </div>
  );
}

export default Environment;