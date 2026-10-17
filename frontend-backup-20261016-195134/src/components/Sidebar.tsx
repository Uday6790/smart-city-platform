import { NavLink } from "react-router-dom";

import useCityData from "../hooks/useCityData";
import { useLocation } from "../context/LocationContext";

function Sidebar() {
  const {
    buildings = [],
    sensors = [],
    traffic = [],
  } = useCityData();

  const { selectedLocation } =
    useLocation();

  const buildingCount =
    buildings.length > 0
      ? buildings.length
      : 14;

  const sensorCount =
    sensors.length > 0
      ? sensors.length
      : 15;

  const trafficCount =
    traffic.length > 0
      ? traffic.length
      : 13;

  const navigation = [
    {
      name: "Dashboard",
      path: "/",
      icon: "🏠",
    },
    {
      name: "Buildings",
      path: "/buildings",
      icon: "🏢",
      count: buildingCount,
    },
    {
      name: "Traffic",
      path: "/traffic",
      icon: "🚦",
      count: trafficCount,
    },
    {
      name: "Sensors",
      path: "/sensors",
      icon: "📡",
      count: sensorCount,
    },
    {
      name: "Environment",
      path: "/environment",
      icon: "🌱",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "📊",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-title">

        <div className="sidebar-logo">
          🏙️
        </div>

        <div>

          <h2>Smart City</h2>

          <span>
            {selectedLocation.name}
          </span>

        </div>

      </div>

      <nav className="sidebar-navigation">

        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link sidebar-link-active"
                : "sidebar-link"
            }
          >

            <div className="sidebar-link-left">

              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span className="sidebar-name">
                {item.name}
              </span>

            </div>

            {item.count !== undefined && (
              <span className="sidebar-count">
                {item.count}
              </span>
            )}

          </NavLink>
        ))}

      </nav>

      <div className="sidebar-location">

        <span className="sidebar-location-icon">
          📍
        </span>

        <div>

          <strong>
            {selectedLocation.name}
          </strong>

          <small>
            {selectedLocation.address}
          </small>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;