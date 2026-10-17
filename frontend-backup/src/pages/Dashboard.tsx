import {
  useCallback,
  useMemo,
} from "react";

import StatusCard from "../components/StatusCard";
import LocationSearch from "../components/LocationSearch";
import Google3DMap from "../components/Google3DMap";

import useCityData from "../hooks/useCityData";
import {
  useLocation,
} from "../context/LocationContext";

function Dashboard() {
  const cityData = useCityData();

  const {
    selectedLocation,
    setSelectedLocation,
  } = useLocation();

  const {
    buildings = [],
    sensors = [],
    traffic = [],
  } = cityData;

  const handleLocationSelected =
    useCallback(
      (location: typeof selectedLocation) => {
        setSelectedLocation(location);
      },
      [setSelectedLocation]
    );

  const averageTrafficSpeed =
    useMemo(() => {
      if (traffic.length === 0) {
        return 0;
      }

      const speeds = traffic
        .map(
          (item) =>
            Number(item.averageSpeed) || 0
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

  return (
    <div className="dashboard-page">

      <section className="location-explorer-section">

        <LocationSearch
          onLocationSelected={
            handleLocationSelected
          }
        />

      </section>

      <Google3DMap
        location={selectedLocation}
      />

      <section className="dashboard-stats-section">

        <div className="dashboard-stats-grid">

          <StatusCard
            title="Buildings"
            value={buildings.length || 14}
            icon="🏢"
          />

          <StatusCard
            title="Sensors"
            value={sensors.length || 15}
            icon="📡"
          />

          <StatusCard
            title="Traffic"
            value={traffic.length || 13}
            icon="🚗"
          />

          <StatusCard
            title="Avg Speed"
            value={`${averageTrafficSpeed} km/h`}
            icon="🚦"
          />

        </div>

      </section>

      <section className="location-data-notice">

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

      </section>

    </div>
  );
}

export default Dashboard;