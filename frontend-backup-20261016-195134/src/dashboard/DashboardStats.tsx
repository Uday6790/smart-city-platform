import StatusCard from "../components/StatusCard";
import CityScene from "../three/CityScene/CityScene";
import useCityData from "../hooks/useCityData";
import { cityLocation } from "../data/cityLocation";

/* =========================================================
   DEMO BUILDING TYPE
   ========================================================= */

interface DemoBuilding {
  id: number;
  name: string;
  height: number;
  width: number;
  depth: number;
  xPosition: number;
  zPosition: number;
  color: string;
}

/* =========================================================
   DEMO SENSOR TYPE
   ========================================================= */

interface DemoSensor {
  id: number;
  name: string;
  type: string;
  value: number;
  unit: string;
  xPosition: number;
  zPosition: number;
  status: string;
}

/* =========================================================
   DEMO BUILDINGS
   ========================================================= */

const demoBuildings: DemoBuilding[] = [
  {
    id: 1,
    name: "City Hall",
    height: 10,
    width: 6,
    depth: 6,
    xPosition: -18,
    zPosition: -12,
    color: "#2563eb",
  },
  {
    id: 2,
    name: "Tech Tower",
    height: 18,
    width: 5,
    depth: 5,
    xPosition: -10,
    zPosition: -12,
    color: "#7c3aed",
  },
  {
    id: 3,
    name: "Central Hospital",
    height: 12,
    width: 7,
    depth: 6,
    xPosition: 0,
    zPosition: -12,
    color: "#dc2626",
  },
  {
    id: 4,
    name: "Shopping Mall",
    height: 8,
    width: 9,
    depth: 6,
    xPosition: 11,
    zPosition: -12,
    color: "#ea580c",
  },
  {
    id: 5,
    name: "University",
    height: 11,
    width: 7,
    depth: 6,
    xPosition: 19,
    zPosition: -12,
    color: "#0891b2",
  },
  {
    id: 6,
    name: "Financial Center",
    height: 22,
    width: 5,
    depth: 5,
    xPosition: -18,
    zPosition: 0,
    color: "#4f46e5",
  },
  {
    id: 7,
    name: "Police Station",
    height: 7,
    width: 5,
    depth: 5,
    xPosition: -9,
    zPosition: 0,
    color: "#1d4ed8",
  },
  {
    id: 8,
    name: "Metro Station",
    height: 6,
    width: 8,
    depth: 5,
    xPosition: 9,
    zPosition: 0,
    color: "#059669",
  },
  {
    id: 9,
    name: "Hotel",
    height: 15,
    width: 5,
    depth: 5,
    xPosition: 18,
    zPosition: 0,
    color: "#be123c",
  },
  {
    id: 10,
    name: "Residential Tower",
    height: 20,
    width: 5,
    depth: 5,
    xPosition: -18,
    zPosition: 12,
    color: "#9333ea",
  },
  {
    id: 11,
    name: "Office Building",
    height: 14,
    width: 6,
    depth: 5,
    xPosition: -8,
    zPosition: 12,
    color: "#0369a1",
  },
  {
    id: 12,
    name: "Smart School",
    height: 8,
    width: 7,
    depth: 5,
    xPosition: 1,
    zPosition: 12,
    color: "#16a34a",
  },
  {
    id: 13,
    name: "Research Center",
    height: 13,
    width: 6,
    depth: 6,
    xPosition: 10,
    zPosition: 12,
    color: "#ca8a04",
  },
  {
    id: 14,
    name: "Energy Center",
    height: 9,
    width: 6,
    depth: 5,
    xPosition: 19,
    zPosition: 12,
    color: "#65a30f",
  },
];

/* =========================================================
   DEMO SENSORS
   ========================================================= */

const demoSensors: DemoSensor[] = [
  {
    id: 1,
    name: "Air Quality 01",
    type: "AIR",
    value: 42,
    unit: "AQI",
    xPosition: -15,
    zPosition: -8,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Temperature 01",
    type: "TEMPERATURE",
    value: 29,
    unit: "°C",
    xPosition: -7,
    zPosition: -8,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Traffic Sensor 01",
    type: "TRAFFIC",
    value: 74,
    unit: "vehicles",
    xPosition: 4,
    zPosition: -8,
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Noise Sensor 01",
    type: "NOISE",
    value: 55,
    unit: "dB",
    xPosition: 15,
    zPosition: -8,
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Air Quality 02",
    type: "AIR",
    value: 38,
    unit: "AQI",
    xPosition: -15,
    zPosition: -3,
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Temperature 02",
    type: "TEMPERATURE",
    value: 30,
    unit: "°C",
    xPosition: -4,
    zPosition: -3,
    status: "ACTIVE",
  },
  {
    id: 7,
    name: "Traffic Sensor 02",
    type: "TRAFFIC",
    value: 61,
    unit: "vehicles",
    xPosition: 5,
    zPosition: -3,
    status: "ACTIVE",
  },
  {
    id: 8,
    name: "Water Sensor",
    type: "WATER",
    value: 72,
    unit: "%",
    xPosition: 15,
    zPosition: -3,
    status: "ACTIVE",
  },
  {
    id: 9,
    name: "Air Quality 03",
    type: "AIR",
    value: 45,
    unit: "AQI",
    xPosition: -14,
    zPosition: 4,
    status: "ACTIVE",
  },
  {
    id: 10,
    name: "Temperature 03",
    type: "TEMPERATURE",
    value: 28,
    unit: "°C",
    xPosition: -4,
    zPosition: 4,
    status: "ACTIVE",
  },
  {
    id: 11,
    name: "Traffic Sensor 03",
    type: "TRAFFIC",
    value: 82,
    unit: "vehicles",
    xPosition: 5,
    zPosition: 4,
    status: "ACTIVE",
  },
  {
    id: 12,
    name: "Noise Sensor 02",
    type: "NOISE",
    value: 49,
    unit: "dB",
    xPosition: 15,
    zPosition: 4,
    status: "ACTIVE",
  },
  {
    id: 13,
    name: "Air Quality 04",
    type: "AIR",
    value: 35,
    unit: "AQI",
    xPosition: -13,
    zPosition: 9,
    status: "ACTIVE",
  },
  {
    id: 14,
    name: "Temperature 04",
    type: "TEMPERATURE",
    value: 27,
    unit: "°C",
    xPosition: 3,
    zPosition: 9,
    status: "ACTIVE",
  },
  {
    id: 15,
    name: "Traffic Sensor 04",
    type: "TRAFFIC",
    value: 68,
    unit: "vehicles",
    xPosition: 14,
    zPosition: 9,
    status: "ACTIVE",
  },
];

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard() {
  const {
    buildings,
    sensors,
    traffic,
    loading,
    error,
  } = useCityData();

  /* =====================================================
     FALLBACK DATA
     ===================================================== */

  const activeBuildings =
    buildings && buildings.length > 0
      ? buildings
      : demoBuildings;

  const activeSensors =
    sensors && sensors.length > 0
      ? sensors
      : demoSensors;

  /* =====================================================
     VEHICLE COUNT
     ===================================================== */

  /*
   * There are 13 demo cars in CityScene.tsx.
   */

  const demoVehicleCount = 13;

  const totalVehicles =
    traffic && traffic.length > 0
      ? traffic.reduce(
          (total, item) =>
            total +
            (Number(item.vehicleCount) || 0),
          0
        )
      : demoVehicleCount;

  /* =====================================================
     ACTIVE SENSOR COUNT
     ===================================================== */

  const activeSensorCount =
    activeSensors.filter(
      (sensor) =>
        !sensor.status ||
        sensor.status.toUpperCase() ===
          "ACTIVE"
    ).length;

  /* =====================================================
     AVERAGE SPEED
     ===================================================== */

  const averageSpeed =
    traffic && traffic.length > 0
      ? Math.round(
          traffic.reduce(
            (total, item) =>
              total +
              (Number(item.averageSpeed) || 0),
            0
          ) / traffic.length
        )
      : 42;

  /* =====================================================
     DASHBOARD
     ===================================================== */

  return (
    <div className="dashboard-page">

      {/* =================================================
          HEADER
         ================================================= */}

      <div className="dashboard-header">

        <div>
          <div className="dashboard-title-row">

            <h1>
              🏙️ Smart City Dashboard
            </h1>

            <span className="live-badge">
              ● LIVE
            </span>

          </div>

          <p className="dashboard-subtitle">
            Real-time monitoring of{" "}
            <strong>
              {cityLocation.name},{" "}
              {cityLocation.state}
            </strong>
          </p>
        </div>

        <div className="dashboard-location-badge">

          <span className="location-pin">
            📍
          </span>

          <div>
            <strong>
              {cityLocation.name}
            </strong>

            <span>
              {cityLocation.state},{" "}
              {cityLocation.country}
            </span>
          </div>

        </div>

      </div>

      {/* =================================================
          GUNTUR LOCATION
         ================================================= */}

      <div className="city-location-card">

        <div className="city-location-left">

          <div className="city-location-icon">
            📍
          </div>

          <div>

            <span className="location-label">
              CITY LOCATION
            </span>

            <h2>
              {cityLocation.name},{" "}
              {cityLocation.state}
            </h2>

            <p>
              {cityLocation.country}
            </p>

          </div>

        </div>

        <div className="city-coordinates">

          <div>
            <span>
              Latitude
            </span>

            <strong>
              {cityLocation.latitude.toFixed(4)}
              ° N
            </strong>
          </div>

          <div>
            <span>
              Longitude
            </span>

            <strong>
              {cityLocation.longitude.toFixed(4)}
              ° E
            </strong>
          </div>

        </div>

      </div>

      {/* =================================================
          LOADING
         ================================================= */}

      {loading && (
        <div className="dashboard-message loading-message">

          <div className="loading-spinner" />

          <span>
            Loading Guntur smart city data...
          </span>

        </div>
      )}

      {/* =================================================
          ERROR
         ================================================= */}

      {error && (
        <div className="dashboard-message error-message">
          ⚠️ {error}
        </div>
      )}

      {/* =================================================
          MAIN STATUS CARDS
         ================================================= */}

      <div className="status-card-row">

        <StatusCard
          title="Buildings"
          value={activeBuildings.length}
          icon="🏢"
        />

        <StatusCard
          title="Active Sensors"
          value={activeSensorCount}
          icon="📡"
        />

        <StatusCard
          title="Vehicles"
          value={totalVehicles}
          icon="🚗"
        />

        <StatusCard
          title="Average Speed"
          value={`${averageSpeed} km/h`}
          icon="⚡"
        />

      </div>

      {/* =================================================
          EXTRA INFORMATION
         ================================================= */}

      <div className="dashboard-info-grid">

        <div className="dashboard-info-card">

          <div className="dashboard-info-icon">
            🏢
          </div>

          <div className="dashboard-info-content">

            <span>
              BUILDINGS
            </span>

            <strong>
              {activeBuildings.length}
            </strong>

            <p>
              Smart city buildings currently
              displayed.
            </p>

          </div>

        </div>

        <div className="dashboard-info-card">

          <div className="dashboard-info-icon">
            📡
          </div>

          <div className="dashboard-info-content">

            <span>
              IOT SENSORS
            </span>

            <strong>
              {activeSensors.length}
            </strong>

            <p>
              Environmental and infrastructure
              sensors.
            </p>

          </div>

        </div>

        <div className="dashboard-info-card">

          <div className="dashboard-info-icon">
            🚗
          </div>

          <div className="dashboard-info-content">

            <span>
              VEHICLES
            </span>

            <strong>
              {totalVehicles}
            </strong>

            <p>
              Vehicles monitored in the city.
            </p>

          </div>

        </div>

        <div className="dashboard-info-card">

          <div className="dashboard-info-icon">
            📍
          </div>

          <div className="dashboard-info-content">

            <span>
              LOCATION
            </span>

            <strong>
              {cityLocation.name}
            </strong>

            <p>
              {cityLocation.state},{" "}
              {cityLocation.country}
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          3D CITY HEADER
         ================================================= */}

      <div className="section-header">

        <div>

          <span className="section-kicker">
            3D CITY MODEL
          </span>

          <h2>
            {cityLocation.name} Smart City
          </h2>

          <p>
            Buildings, roads, moving vehicles,
            traffic lights and IoT sensors
          </p>

        </div>

        <div className="section-location">
          📍 {cityLocation.name},{" "}
          {cityLocation.state}
        </div>

      </div>

      {/* =================================================
          3D CITY SCENE
         ================================================= */}

      <div className="city-scene-wrapper">

        <CityScene
          buildings={buildings}
          sensors={sensors}
          traffic={traffic}
        />

      </div>

    </div>
  );
}

export default Dashboard;