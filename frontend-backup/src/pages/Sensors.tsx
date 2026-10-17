import {
  useEffect,
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

function Sensors() {
  const {
    selectedLocation,
  } = useLocation();

  const [sensors, setSensors] =
    useState<Sensor[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadSensors = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getSensors();

      setSensors(data || []);

    } catch (err) {
      console.error(
        "Failed to load sensors:",
        err
      );

      setError(
        "Unable to load sensor data from Spring Boot."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSensors();
  }, []);

  const getStatus = (
    sensor: Sensor
  ) => {
    return sensor.status || "ACTIVE";
  };

  const isActive = (
    sensor: Sensor
  ) => {
    return (
      getStatus(sensor)
        .toUpperCase() ===
      "ACTIVE"
    );
  };

  const getSensorIcon =
    (type: string) => {
      switch (
        type.toUpperCase()
      ) {
        case "AIR":
          return "🌫️";

        case "TEMPERATURE":
          return "🌡️";

        case "TRAFFIC":
          return "🚗";

        case "NOISE":
          return "🔊";

        case "WATER":
          return "💧";

        default:
          return "📡";
      }
    };

  const activeSensors =
    sensors.filter(
      isActive
    ).length;

  const inactiveSensors =
    sensors.length -
    activeSensors;

  if (loading) {
    return (
      <div className="page-container">

        <div className="page-header">

          <h1>
            📡 Sensors
          </h1>

          <p>
            Loading sensors for{" "}
            {selectedLocation.name}...
          </p>

        </div>

        <div className="loading-message">
          Loading sensor data...
        </div>

      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">

        <div>

          <h1>
            📡 Smart City Sensors
          </h1>

          <p>
            Monitoring sensors for{" "}
            <strong>
              {selectedLocation.name}
            </strong>
          </p>

        </div>

        <button
          className="refresh-button"
          onClick={loadSensors}
        >
          🔄 Refresh
        </button>

      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <div className="sensor-summary">

        <div className="summary-card">
          <span>
            Total Sensors
          </span>

          <strong>
            {sensors.length}
          </strong>
        </div>

        <div className="summary-card">
          <span>
            Active Sensors
          </span>

          <strong>
            {activeSensors}
          </strong>
        </div>

        <div className="summary-card">
          <span>
            Offline Sensors
          </span>

          <strong>
            {inactiveSensors}
          </strong>
        </div>

      </div>

      {sensors.length === 0 ? (
        <div className="empty-state">

          <div>📡</div>

          <h2>
            No Sensors Found
          </h2>

          <p>
            No sensor records were
            returned by the API.
          </p>

        </div>
      ) : (
        <div className="sensor-grid">

          {sensors.map(
            (sensor) => (
              <div
                className="sensor-card"
                key={sensor.id}
              >

                <div className="sensor-card-header">

                  <div className="sensor-icon">
                    {getSensorIcon(
                      sensor.type
                    )}
                  </div>

                  <span
                    className={
                      isActive(sensor)
                        ? "sensor-status sensor-active"
                        : "sensor-status sensor-inactive"
                    }
                  >
                    ●{" "}
                    {getStatus(sensor)}
                  </span>

                </div>

                <h3>
                  {sensor.name}
                </h3>

                <p className="sensor-type">
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

                <div className="sensor-details">

                  <div>
                    <span>
                      X Position
                    </span>

                    <strong>
                      {sensor.xPosition}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Z Position
                    </span>

                    <strong>
                      {sensor.zPosition}
                    </strong>
                  </div>

                </div>

                <div className="sensor-footer">

                  Location:{" "}
                  {selectedLocation.name}

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default Sensors;