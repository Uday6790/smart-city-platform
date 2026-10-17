import {
  useCallback,
  useMemo,
  useState,
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
  const [locationMessage, setLocationMessage] = useState("");
  const [locating, setLocating] = useState(false);

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

  const useCurrentLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setLocationMessage("This browser does not support location access.");
      return;
    }

    setLocating(true);
    setLocationMessage("Requesting your location…");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation({
          name: "My Current Location",
          address: `Your device location · ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          latitude,
          longitude,
        });
        setLocationMessage("Map centered on your current location. Open Buildings to explore nearby mapped places.");
        setLocating(false);
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied. Allow location access in your browser and try again."
            : error.code === error.TIMEOUT
              ? "Location lookup timed out. Please try again."
              : "Could not determine your location. Check device location settings.";
        setLocationMessage(message);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, [setSelectedLocation]);

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
          onLocationSelected={handleLocationSelected}
        />
        <div className="location-action-row">
          <button
            type="button"
            className="current-location-button"
            onClick={useCurrentLocation}
            disabled={locating}
          >
            <span aria-hidden="true">⌖</span>
            {locating ? "Finding your location…" : "Use my current location"}
          </button>
          <a className="nearby-link" href="/buildings">
            Explore nearby buildings & places <span aria-hidden="true">↗</span>
          </a>
        </div>
        {locationMessage && (
          <p className="location-feedback" role="status">{locationMessage}</p>
        )}
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