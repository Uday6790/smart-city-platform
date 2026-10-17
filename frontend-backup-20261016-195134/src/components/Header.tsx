import {
  useLocation,
} from "../context/LocationContext";

function Header() {
  const {
    selectedLocation,
  } = useLocation();

  return (
    <header className="cyber-header">

      <div className="brand-block">

        <div className="brand-mark">
          ◈
        </div>

        <div>

          <div className="brand-title">
            SMART CITY
            <span> // NEXUS</span>
          </div>

          <div className="brand-subtitle">
            REAL-TIME URBAN INTELLIGENCE SYSTEM
          </div>

        </div>

      </div>

      <div className="header-center">

        <span className="header-location-dot">
          ●
        </span>

        <span>
          {selectedLocation.name}
        </span>

        <span className="header-divider">
          //
        </span>

        <span className="header-coordinates">
          {selectedLocation.latitude.toFixed(4)}
          {" , "}
          {selectedLocation.longitude.toFixed(4)}
        </span>

      </div>

      <div className="system-status">

        <span className="pulse-dot" />

        <div>
          <strong>
            SYSTEM ONLINE
          </strong>

          <small>
            LIVE DATA STREAM
          </small>
        </div>

      </div>

    </header>
  );
}

export default Header;