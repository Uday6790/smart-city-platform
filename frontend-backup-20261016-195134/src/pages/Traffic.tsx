import { useEffect, useState } from "react";
import type { TrafficData } from "../types/city";
import { getTraffic } from "../services/api";

function Traffic() {
  const [traffic, setTraffic] = useState<TrafficData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTraffic();
  }, []);

  const loadTraffic = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTraffic();

      setTraffic(data || []);
    } catch (err) {
      console.error(
        "Failed to load traffic:",
        err
      );

      setError(
        "Unable to load traffic data from Spring Boot."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalVehicles = traffic.reduce(
    (total, item) =>
      total + (Number(item.vehicleCount) || 0),
    0
  );

  const averageSpeed =
    traffic.length > 0
      ? Math.round(
          traffic.reduce(
            (total, item) =>
              total +
              (Number(item.averageSpeed) || 0),
            0
          ) / traffic.length
        )
      : 0;

  const getCongestionClass = (
    level: string
  ) => {
    switch (level?.toUpperCase()) {
      case "LOW":
        return "congestion-low";

      case "MEDIUM":
        return "congestion-medium";

      case "HIGH":
        return "congestion-high";

      case "CRITICAL":
      case "SEVERE":
        return "congestion-critical";

      default:
        return "congestion-medium";
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>🚦 Traffic</h1>
          <p>
            Loading traffic information...
          </p>
        </div>

        <div className="loading-message">
          Loading traffic data...
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>🚦 Traffic Management</h1>

          <p>
            Monitor vehicle flow, speed and road
            congestion.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={loadTraffic}
        >
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <div className="traffic-summary">
        <div className="summary-card">
          <span>Traffic Records</span>
          <strong>{traffic.length}</strong>
        </div>

        <div className="summary-card">
          <span>Total Vehicles</span>
          <strong>{totalVehicles}</strong>
        </div>

        <div className="summary-card">
          <span>Average Speed</span>
          <strong>
            {averageSpeed} km/h
          </strong>
        </div>
      </div>

      {traffic.length === 0 ? (
        <div className="empty-state">
          <div>🚦</div>

          <h2>No Traffic Data</h2>

          <p>
            No traffic records were returned by
            the Spring Boot API.
          </p>
        </div>
      ) : (
        <div className="traffic-grid">
          {traffic.map((item) => (
            <div
              className="traffic-card"
              key={item.id}
            >
              <div className="traffic-card-header">
                <h3>
                  🚦 {item.roadName}
                </h3>

                <span
                  className={`congestion-badge ${getCongestionClass(
                    item.congestionLevel
                  )}`}
                >
                  {item.congestionLevel}
                </span>
              </div>

              <div className="traffic-stats">
                <div>
                  <span>🚗 Vehicles</span>

                  <strong>
                    {item.vehicleCount}
                  </strong>
                </div>

                <div>
                  <span>⚡ Speed</span>

                  <strong>
                    {item.averageSpeed} km/h
                  </strong>
                </div>
              </div>

              <div className="traffic-location">
                📍{" "}
                {item.location ||
                  item.roadName}
              </div>

              <div className="traffic-time">
                🕐{" "}
                {item.timestamp ||
                  "Live data"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Traffic;