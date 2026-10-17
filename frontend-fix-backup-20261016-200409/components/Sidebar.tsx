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

  const buildingCount = buildings.length;

  const sensorCount = sensors.length;

  const trafficCount = traffic.length;

  const navigation = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ðŸ ",
    },
    {
      name: "Buildings",
      path: "/buildings",
      icon: "ðŸ¢",
      count: buildingCount,
    },
    {
      name: "Traffic",
      path: "/traffic",
      icon: "ðŸš¦",
      count: trafficCount,
    },
    {
      name: "Sensors",
      path: "/sensors",
      icon: "ðŸ“¡",
      count: sensorCount,
    },
    {
      name: "Environment",
      path: "/environment",
      icon: "ðŸŒ±",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "ðŸ“Š",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-title">

        <div className="sidebar-logo">
          ðŸ™ï¸
        </div>

        <div>

          <h2>SMART CITY</h2>

          <span>
            // NEXUS CONSOLE
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
          ðŸ“
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
