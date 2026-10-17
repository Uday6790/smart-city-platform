
import { useEffect, useMemo, useState } from "react";
import type { Sensor } from "../types/city";
import { getSensors } from "../services/api";
import { useLocation } from "../context/LocationContext";

function Environment() {
  const { selectedLocation } = useLocation();

  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let active = true;
    let requestInProgress = false;

    const loadSensors = async () => {
      if (requestInProgress) return;

      requestInProgress = true;

      try {
        const data = await getSensors();

        if (!active) return;

        setSensors(Array.isArray(data) ? data : []);
        setLastUpdated(new Date());
        setError("");
      } catch (err) {
        console.error("Environment API error:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to refresh environmental data."
          );
        }
      } finally {
        requestInProgress = false;

        if (active) {
          setLoading(false);
        }
      }
    };

    void loadSensors();

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadSensors();
      }
    }, 10000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void loadSensors();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(intervalId);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  const temperatureSensors = useMemo(
    () => sensors.filter(
      sensor => sensor.type?.toUpperCase() === "TEMPERATURE"
    ),
    [sensors]
  );

  const airSensors = useMemo(
    () => sensors.filter(
      sensor => sensor.type?.toUpperCase() === "AIR"
    ),
    [sensors]
  );

  const noiseSensors = useMemo(
    () => sensors.filter(
      sensor => sensor.type?.toUpperCase() === "NOISE"
    ),
    [sensors]
  );

  const average = (items: Sensor[]) => {
    const values = items
      .map(sensor => Number(sensor.value))
      .filter(value => Number.isFinite(value));

    if (values.length === 0) return null;

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  const averageTemperature = average(temperatureSensors);
  const averageAirQuality = average(airSensors);
  const averageNoise = average(noiseSensors);

  const formatValue = (value: number | null, digits = 0) =>
    value === null ? "--" : value.toFixed(digits);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>🌱 Environment</h1>
          <p>
            Environmental monitoring for{" "}
            <strong>{selectedLocation.name}</strong>
          </p>
        </div>
      </div>

      <div className="location-data-notice">
        <div>
          <span className="section-kicker">SELECTED LOCATION</span>
          <h3>{selectedLocation.name}</h3>
          <p>{selectedLocation.address}</p>
        </div>
      </div>

      <div className="sensor-summary">
        <div className="summary-card">
          <span>🌡️ Temperature</span>
          <strong>{formatValue(averageTemperature, 1)} °C</strong>
        </div>

        <div className="summary-card">
          <span>🌫️ Air Quality</span>
          <strong>{formatValue(averageAirQuality)} AQI</strong>
        </div>

        <div className="summary-card">
          <span>🔊 Noise</span>
          <strong>{formatValue(averageNoise)} dB</strong>
        </div>
      </div>

      <p className="environment-status" aria-live="polite">
        {loading
          ? "Loading sensor data..."
          : error
            ? `Refresh error: ${error}`
            : lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString()} · Refreshes every 10 seconds`
              : "Waiting for sensor data..."}
      </p>

      {!loading && !error && sensors.length === 0 && (
        <p>No sensors were returned by the API.</p>
      )}

      <div className="sensor-grid">
        {sensors.map(sensor => (
          <div className="sensor-card" key={sensor.id}>
            <h3>{sensor.name}</h3>
            <p>{sensor.type}</p>

            <div className="sensor-value">
              <strong>{sensor.value ?? "--"}</strong>
              <span>{sensor.unit}</span>
            </div>

            <div className="sensor-footer">
              📍 {selectedLocation.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Environment;
