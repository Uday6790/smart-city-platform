import { useLocation } from "../context/LocationContext";

function Header() {
  const { selectedLocation } =
    useLocation();

  return (
    <header className="header">

      <div>

        <div className="header-title">
          SMART CITY // NEXUS
        </div>

        <div className="header-subtitle">
          SPATIAL INTELLIGENCE · URBAN MONITORING
        </div>

        <div
          style={{
            marginTop: "6px",
            color: "#38bdf8",
            fontSize: "13px",
          }}
        >
          📍 {selectedLocation.name}
        </div>

      </div>

      <div className="header-status">
        <span>●</span>
        LIVE
      </div>

    </header>
  );
}

export default Header;