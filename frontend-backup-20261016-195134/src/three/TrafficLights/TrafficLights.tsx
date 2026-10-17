interface TrafficLightProps {
  position: [
    number,
    number,
    number
  ];
}

function TrafficLight({
  position
}: TrafficLightProps) {

  return (
    <group
      position={position}
    >

      {/* Pole */}

      <mesh
        position={[
          0,
          2,
          0
        ]}
      >

        <boxGeometry
          args={[
            0.5,
            4,
            0.5
          ]}
        />

        <meshStandardMaterial
          color="#111827"
        />

      </mesh>

      {/* Traffic light body */}

      <mesh
        position={[
          0,
          4,
          0
        ]}
      >

        <boxGeometry
          args={[
            1,
            2.5,
            0.7
          ]}
        />

        <meshStandardMaterial
          color="#020617"
        />

      </mesh>

      {/* Red */}

      <mesh
        position={[
          0,
          4.7,
          0.4
        ]}
      >

        <sphereGeometry
          args={[
            0.25,
            16,
            16
          ]}
        />

        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.7}
        />

      </mesh>

      {/* Yellow */}

      <mesh
        position={[
          0,
          4,
          0.4
        ]}
      >

        <sphereGeometry
          args={[
            0.25,
            16,
            16
          ]}
        />

        <meshStandardMaterial
          color="#f59e0b"
        />

      </mesh>

      {/* Green */}

      <mesh
        position={[
          0,
          3.3,
          0.4
        ]}
      >

        <sphereGeometry
          args={[
            0.25,
            16,
            16
          ]}
        />

        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.5}
        />

      </mesh>

    </group>
  );
}

function TrafficLights() {

  return (
    <group>

      <TrafficLight
        position={[
          -4,
          0,
          -4
        ]}
      />

      <TrafficLight
        position={[
          4,
          0,
          4
        ]}
      />

      <TrafficLight
        position={[
          -4,
          0,
          4
        ]}
      />

      <TrafficLight
        position={[
          4,
          0,
          -4
        ]}
      />

    </group>
  );
}

export default TrafficLights;