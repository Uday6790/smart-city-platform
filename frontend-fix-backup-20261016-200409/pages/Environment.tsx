import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Sensor,
} from "../types/city";

import {
  getSensors,
} from "../services/api";

import {
  useLocation,
} from "../context/LocationContext";

function Environment() {
  const {
    selectedLocation,
  } = useLocation();

  const [sensors, setSensors] =
    useState<Sensor[]>([]);

  useEffect(() => {
    getSensors()
      .then((data) =>
        setSensors(data || [])
      )
      .catch((error) =>
        console.error(
          "Environment API error:",
          error
        )
      );
  }, []);

  const temperatureSensors =
    sensors.filter(
      (sensor) =>
        sensor.type?.toUpperCase() ===
        "TEMPERATURE"
    );

  const airSensors =
    sensors.filter(
      (sensor) =>
        sensor.type?.toUpperCase() ===
        "AIR"
    );

  const noiseSensors =
    sensors.filter(
      (sensor) =>
        sensor.type?.toUpperCase() ===
        "NOISE"
    );

  const averageTemperature =
    useMemo(() => {
      if (
        temperatureSensors.length === 0
      ) {
        return 0;
      }

      return (
        temperatureSensors.reduce(
          (sum, sensor) =>
            sum +
            Number(sensor.value || 0),
          0
        ) /
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

      return Math.round(
        airSensors.reduce(
          (sum, sensor) =>
            sum +
            Number(sensor.value || 0),
          0
        ) /
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

      return Math.round(
        noiseSensors.reduce(
          (sum, sensor) =>
            sum +
            Number(sensor.value || 0),
          0
        ) /
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
            Environmental monitoring for{" "}
            <strong>
              {selectedLocation.name}
            </strong>
          </p>

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

              <div className="sensor-footer">

                📍{" "}
                {selectedLocation.name}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Environment;