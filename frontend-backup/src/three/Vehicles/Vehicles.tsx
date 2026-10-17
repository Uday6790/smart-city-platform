import {
  useFrame
} from "@react-three/fiber";

import {
  useRef
} from "react";

import type {
  Mesh
} from "three";

interface VehicleProps {
  index: number;
  z: number;
  speed: number;
}

function Vehicle({
  index,
  z,
  speed
}: VehicleProps) {

  const ref =
    useRef<Mesh | null>(null);

  useFrame(
    (_, delta) => {

      if (!ref.current) {
        return;
      }

      ref.current.position.x +=
        delta * speed;

      if (
        ref.current.position.x >
        25
      ) {

        ref.current.position.x =
          -25;

      }

    }
  );

  const vehicleColor =
    index % 3 === 0
      ? "#ef4444"
      : index % 3 === 1
        ? "#2563eb"
        : "#f59e0b";

  return (
    <mesh
      ref={ref}
      position={[
        -20 + index * 3,
        0.5,
        z
      ]}
      castShadow
    >

      <boxGeometry
        args={[
          1.5,
          0.7,
          0.8
        ]}
      />

      <meshStandardMaterial
        color={vehicleColor}
      />

    </mesh>
  );
}

interface VehiclesProps {
  traffic: {
    vehicleCount: number;
  }[];
}

function Vehicles({
  traffic
}: VehiclesProps) {

  const totalVehicles =
    traffic.reduce(
      (total, item) =>
        total + item.vehicleCount,
      0
    );

  const count = Math.min(
    Math.max(
      Math.ceil(totalVehicles / 10),
      6
    ),
    20
  );

  return (
    <group>

      {Array.from({
        length: count
      }).map(
        (_, index) => (

          <Vehicle
            key={index}
            index={index}
            z={
              index % 2 === 0
                ? -1.2
                : 1.2
            }
            speed={
              1 +
              (index % 4) * 0.3
            }
          />

        )
      )}

    </group>
  );
}

export default Vehicles;