
import { NavLink } from "react-router-dom";
import useCityData from "../hooks/useCityData";
import { useLocation } from "../context/LocationContext";

function Sidebar() {
  const {
    buildings = [],
    traffic = [],
    loading,
    error,
  } = useCityData();

  const { selectedLocation } = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      path: "/",
      icon: "D",
    },
    {
      name: "Buildings",
      path: "/buildings",
      icon: "B",
      count: buildings.length,
    },
    {
      name: "Traffic",
      path: "/traffic",
      icon: "T",
      count: traffic.length,
    },
    {
      name: "Environment",
      path: "/environment",
      icon: "E",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "A",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-logo">SC</div>
        <div>
          <h2>SMART CITY</h2>
        </div>
      </div>

      <nav
        className="sidebar-navigation"
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link sidebar-link-active"
                : "sidebar-link"
            }
          >
            <div className="sidebar-link-left">
              <span className="sidebar-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="sidebar-name">
                {item.name}
              </span>
            </div>

            {item.count !== undefined && (
              <span
                className="sidebar-count"
                aria-label={`${item.count} ${item.name.toLowerCase()}`}
                title={
                  loading
                    ? "Loading data"
                    : error
                      ? "Latest refresh failed"
                      : "Current API record count"
                }
              >
                {loading && item.count === 0
                  ? "…"
                  : item.count}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-location">
        <span className="sidebar-location-icon">LOC</span>
        <div>
          <strong>{selectedLocation.name}</strong>
          <small>{selectedLocation.address}</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
