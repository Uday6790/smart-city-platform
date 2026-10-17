import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   TYPES
   ========================================================= */

interface Building {
  id: number;
  name: string;
  height: number;
  width: number;
  depth: number;
  xPosition: number;
  zPosition: number;
  color?: string;
}

interface Sensor {
  id: number;
  name: string;
  type: string;
  value: number;
  unit: string;
  xPosition: number;
  zPosition: number;
}

interface TrafficItem {
  id: number;
  xPosition?: number;
  zPosition?: number;
  x?: number;
  z?: number;
  location?: string;
}

interface CitySceneProps {
  buildings?: Building[];
  sensors?: Sensor[];
  traffic?: TrafficItem[];
}

/* =========================================================
   DEMO BUILDINGS
   ========================================================= */

const demoBuildings: Building[] = [
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

const demoSensors: Sensor[] = [
  {
    id: 1,
    name: "Air Quality 01",
    type: "AIR",
    value: 42,
    unit: "AQI",
    xPosition: -15,
    zPosition: -8,
  },
  {
    id: 2,
    name: "Temperature 01",
    type: "TEMPERATURE",
    value: 29,
    unit: "°C",
    xPosition: -7,
    zPosition: -8,
  },
  {
    id: 3,
    name: "Traffic Sensor 01",
    type: "TRAFFIC",
    value: 74,
    unit: "vehicles",
    xPosition: 4,
    zPosition: -8,
  },
  {
    id: 4,
    name: "Noise Sensor 01",
    type: "NOISE",
    value: 55,
    unit: "dB",
    xPosition: 15,
    zPosition: -8,
  },
  {
    id: 5,
    name: "Air Quality 02",
    type: "AIR",
    value: 38,
    unit: "AQI",
    xPosition: -15,
    zPosition: -3,
  },
  {
    id: 6,
    name: "Temperature 02",
    type: "TEMPERATURE",
    value: 30,
    unit: "°C",
    xPosition: -4,
    zPosition: -3,
  },
  {
    id: 7,
    name: "Traffic Sensor 02",
    type: "TRAFFIC",
    value: 61,
    unit: "vehicles",
    xPosition: 5,
    zPosition: -3,
  },
  {
    id: 8,
    name: "Water Sensor",
    type: "WATER",
    value: 72,
    unit: "%",
    xPosition: 15,
    zPosition: -3,
  },
  {
    id: 9,
    name: "Air Quality 03",
    type: "AIR",
    value: 45,
    unit: "AQI",
    xPosition: -14,
    zPosition: 4,
  },
  {
    id: 10,
    name: "Temperature 03",
    type: "TEMPERATURE",
    value: 28,
    unit: "°C",
    xPosition: -4,
    zPosition: 4,
  },
  {
    id: 11,
    name: "Traffic Sensor 03",
    type: "TRAFFIC",
    value: 82,
    unit: "vehicles",
    xPosition: 5,
    zPosition: 4,
  },
  {
    id: 12,
    name: "Noise Sensor 02",
    type: "NOISE",
    value: 49,
    unit: "dB",
    xPosition: 15,
    zPosition: 4,
  },
  {
    id: 13,
    name: "Air Quality 04",
    type: "AIR",
    value: 35,
    unit: "AQI",
    xPosition: -13,
    zPosition: 9,
  },
  {
    id: 14,
    name: "Temperature 04",
    type: "TEMPERATURE",
    value: 27,
    unit: "°C",
    xPosition: 3,
    zPosition: 9,
  },
  {
    id: 15,
    name: "Traffic Sensor 04",
    type: "TRAFFIC",
    value: 68,
    unit: "vehicles",
    xPosition: 14,
    zPosition: 9,
  },
];

/* =========================================================
   BUILDINGS
   ========================================================= */

function CityBuildings({
  buildings,
}: {
  buildings: Building[];
}) {
  return (
    <>
      {buildings.map((building) => {
        const height = building.height || 8;
        const width = building.width || 5;
        const depth = building.depth || 5;

        return (
          <group key={building.id}>
            <mesh
              position={[
                building.xPosition,
                height / 2,
                building.zPosition,
              ]}
              castShadow
              receiveShadow
            >
              <boxGeometry
                args={[width, height, depth]}
              />

              <meshStandardMaterial
                color={building.color || "#4f7cac"}
                roughness={0.7}
              />
            </mesh>

            <mesh
              position={[
                building.xPosition,
                height + 0.15,
                building.zPosition,
              ]}
              castShadow
            >
              <boxGeometry
                args={[
                  width + 0.2,
                  0.3,
                  depth + 0.2,
                ]}
              />

              <meshStandardMaterial color="#334155" />
            </mesh>

            <Text
              position={[
                building.xPosition,
                height + 1.2,
                building.zPosition,
              ]}
              fontSize={0.55}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {building.name}
            </Text>
          </group>
        );
      })}
    </>
  );
}

/* =========================================================
   ROADS
   ========================================================= */

function Roads() {
  return (
    <group>
      {[-8, 4, 16].map((z) => (
        <group key={`horizontal-${z}`}>
          <mesh
            position={[0, 0.05, z]}
            receiveShadow
          >
            <boxGeometry
              args={[52, 0.1, 2.5]}
            />

            <meshStandardMaterial color="#202938" />
          </mesh>

          <mesh position={[0, 0.11, z]}>
            <boxGeometry
              args={[50, 0.02, 0.08]}
            />

            <meshStandardMaterial color="#f8fafc" />
          </mesh>

          {[-20, -12, -4, 4, 12, 20].map(
            (x) => (
              <mesh
                key={`mark-${z}-${x}`}
                position={[x, 0.12, z]}
              >
                <boxGeometry
                  args={[3, 0.02, 0.12]}
                />

                <meshStandardMaterial color="#facc15" />
              </mesh>
            )
          )}
        </group>
      ))}

      {[-14, -3, 8, 17].map((x) => (
        <group key={`vertical-${x}`}>
          <mesh
            position={[x, 0.05, 2]}
            receiveShadow
          >
            <boxGeometry
              args={[2.5, 0.1, 38]}
            />

            <meshStandardMaterial color="#202938" />
          </mesh>

          <mesh
            position={[x, 0.11, 2]}
          >
            <boxGeometry
              args={[0.08, 0.02, 36]}
            />

            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      ))}

      <mesh
        position={[2, 0.04, 2]}
        receiveShadow
      >
        <boxGeometry args={[8, 0.08, 8]} />

        <meshStandardMaterial color="#293548" />
      </mesh>
    </group>
  );
}

/* =========================================================
   CAR
   ========================================================= */

function Car({
  startX,
  startZ,
  color,
  speed,
  horizontal,
}: {
  startX: number;
  startZ: number;
  color: string;
  speed: number;
  horizontal: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    if (horizontal) {
      ref.current.position.x += speed * delta;

      if (ref.current.position.x > 27) {
        ref.current.position.x = -27;
      }
    } else {
      ref.current.position.z += speed * delta;

      if (ref.current.position.z > 22) {
        ref.current.position.z = -22;
      }
    }
  });

  return (
    <group
      ref={ref}
      position={[startX, 0.55, startZ]}
    >
      <mesh castShadow>
        <boxGeometry
          args={[1.5, 0.45, 0.8]}
        />

        <meshStandardMaterial color={color} />
      </mesh>

      <mesh
        position={[0, 0.35, 0]}
        castShadow
      >
        <boxGeometry
          args={[0.8, 0.35, 0.65]}
        />

        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      <mesh
        position={[0.15, 0.48, 0]}
      >
        <boxGeometry
          args={[0.35, 0.18, 0.66]}
        />

        <meshStandardMaterial color="#0f172a" />
      </mesh>

      <mesh
        position={[-0.25, 0.48, 0]}
      >
        <boxGeometry
          args={[0.25, 0.18, 0.66]}
        />

        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Wheel 1 */}
      <mesh
        position={[-0.5, -0.3, 0.45]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry
          args={[0.18, 0.18, 0.12, 12]}
        />

        <meshStandardMaterial color="#020617" />
      </mesh>

      {/* Wheel 2 */}
      <mesh
        position={[0.5, -0.3, 0.45]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry
          args={[0.18, 0.18, 0.12, 12]}
        />

        <meshStandardMaterial color="#020617" />
      </mesh>

      {/* Wheel 3 */}
      <mesh
        position={[-0.5, -0.3, -0.45]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry
          args={[0.18, 0.18, 0.12, 12]}
        />

        <meshStandardMaterial color="#020617" />
      </mesh>

      {/* Wheel 4 */}
      <mesh
        position={[0.5, -0.3, -0.45]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry
          args={[0.18, 0.18, 0.12, 12]}
        />

        <meshStandardMaterial color="#020617" />
      </mesh>
    </group>
  );
}

/* =========================================================
   CARS
   ========================================================= */

function Cars() {
  const cars = useMemo<
    [number, number, string, number, boolean][]
  >(
    () => [
      [-25, -8, "#ef4444", 5, true],
      [-15, -8, "#3b82f6", 4, true],
      [-4, -8, "#22c55e", 6, true],
      [8, -8, "#f59e0b", 3, true],
      [20, -8, "#a855f7", 5, true],

      [-22, 4, "#06b6d4", 4, true],
      [-10, 4, "#ef4444", 5, true],
      [2, 4, "#f97316", 6, true],
      [14, 4, "#22c55e", 4, true],

      [-14, -20, "#3b82f6", 4, false],
      [-3, -15, "#f43f5e", 5, false],
      [8, -18, "#eab308", 3, false],
      [17, -12, "#8b5cf6", 4, false],
    ],
    []
  );

  return (
    <>
      {cars.map((car, index) => (
        <Car
          key={index}
          startX={car[0]}
          startZ={car[1]}
          color={car[2]}
          speed={car[3]}
          horizontal={car[4]}
        />
      ))}
    </>
  );
}

/* =========================================================
   SENSORS
   ========================================================= */

function Sensors({
  sensors,
}: {
  sensors: Sensor[];
}) {
  return (
    <>
      {sensors.map((sensor) => (
        <group
          key={sensor.id}
          position={[
            sensor.xPosition,
            1,
            sensor.zPosition,
          ]}
        >
          <mesh castShadow>
            <cylinderGeometry
              args={[0.08, 0.08, 1.5, 8]}
            />

            <meshStandardMaterial color="#64748b" />
          </mesh>

          <mesh position={[0, 0.9, 0]}>
            <sphereGeometry
              args={[0.22, 16, 16]}
            />

            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={2}
            />
          </mesh>

          <Text
            position={[0, 1.5, 0]}
            fontSize={0.35}
            color="#86efac"
            anchorX="center"
            anchorY="middle"
          >
            {`${sensor.type}: ${sensor.value}${sensor.unit}`}
          </Text>
        </group>
      ))}
    </>
  );
}

/* =========================================================
   TRAFFIC LIGHTS
   ========================================================= */

function TrafficLights() {
  const positions: [number, number][] = [
    [-14, -6],
    [-14, 6],
    [8, -6],
    [8, 6],
  ];

  return (
    <>
      {positions.map(([x, z], index) => (
        <group
          key={index}
          position={[x, 0, z]}
        >
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry
              args={[0.08, 0.08, 3, 8]}
            />

            <meshStandardMaterial color="#64748b" />
          </mesh>

          <mesh position={[0, 3, 0]}>
            <boxGeometry
              args={[0.5, 1.2, 0.35]}
            />

            <meshStandardMaterial color="#111827" />
          </mesh>

          <mesh position={[0, 3.35, 0]}>
            <sphereGeometry
              args={[0.1, 12, 12]}
            />

            <meshStandardMaterial
              color="#ef4444"
              emissive="#ef4444"
              emissiveIntensity={1.5}
            />
          </mesh>

          <mesh position={[0, 3, 0]}>
            <sphereGeometry
              args={[0.1, 12, 12]}
            />

            <meshStandardMaterial
              color="#facc15"
              emissive="#facc15"
              emissiveIntensity={1.2}
            />
          </mesh>

          <mesh position={[0, 2.65, 0]}>
            <sphereGeometry
              args={[0.1, 12, 12]}
            />

            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* =========================================================
   TREES
   ========================================================= */

function Trees() {
  const positions: [number, number][] = [
    [-24, -18],
    [-20, -18],
    [-4, -18],
    [5, -18],
    [14, -18],
    [24, -18],

    [-24, 18],
    [-20, 18],
    [-5, 18],
    [5, 18],
    [14, 18],
    [24, 18],

    [-25, -2],
    [25, -2],
    [-25, 8],
    [25, 8],
  ];

  return (
    <>
      {positions.map(([x, z], index) => (
        <group
          key={index}
          position={[x, 0, z]}
        >
          <mesh
            position={[0, 1, 0]}
            castShadow
          >
            <cylinderGeometry
              args={[0.15, 0.2, 2, 8]}
            />

            <meshStandardMaterial color="#78350f" />
          </mesh>

          <mesh
            position={[0, 2.3, 0]}
            castShadow
          >
            <sphereGeometry
              args={[1, 12, 12]}
            />

            <meshStandardMaterial color="#16a34a" />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* =========================================================
   CITY
   ========================================================= */

function City({
  buildings,
  sensors,
}: {
  buildings: Building[];
  sensors: Sensor[];
}) {
  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <planeGeometry
          args={[60, 50]}
        />

        <meshStandardMaterial color="#0f172a" />
      </mesh>

      <Roads />

      <CityBuildings
        buildings={buildings}
      />

      <Sensors
        sensors={sensors}
      />

      <Cars />

      <TrafficLights />

      <Trees />
    </>
  );
}

/* =========================================================
   MAIN CITY SCENE
   ========================================================= */

function CityScene({
  buildings,
  sensors,
}: CitySceneProps) {
  const activeBuildings =
    buildings && buildings.length > 0
      ? buildings
      : demoBuildings;

  const activeSensors =
    sensors && sensors.length > 0
      ? sensors
      : demoSensors;

  return (
    <div className="city-container">

      <Canvas
        shadows
        dpr={[1, 2]}
      >
        {/* =================================================
            CAMERA
           ================================================= */}

        <PerspectiveCamera
          makeDefault
          position={[42, 38, 50]}
          fov={48}
          near={0.1}
          far={200}
        />

        {/* Background */}
        <color
          attach="background"
          args={["#020617"]}
        />

        {/* Lighting */}
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[20, 40, 20]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <pointLight
          position={[0, 20, 0]}
          intensity={1}
        />

        {/* City */}
        <City
          buildings={activeBuildings}
          sensors={activeSensors}
        />

        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={20}
          maxDistance={100}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, 5, 0]}
        />
      </Canvas>

      {/* Overlay */}
      <div className="city-overlay">
        <div className="city-overlay-title">
          🏙️ Guntur Smart City
        </div>

        <div className="city-overlay-subtitle">
          Andhra Pradesh, India
        </div>
      </div>

    </div>
  );
}

export default CityScene;