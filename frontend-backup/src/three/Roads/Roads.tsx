function Roads() {

  return (
    <group>

      {/* Main horizontal road */}

      <mesh
        position={[
          0,
          0.05,
          0
        ]}
        receiveShadow
      >

        <boxGeometry
          args={[
            50,
            0.1,
            5
          ]}
        />

        <meshStandardMaterial
          color="#1e293b"
        />

      </mesh>

      {/* Main vertical road */}

      <mesh
        position={[
          0,
          0.06,
          0
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0
        ]}
        receiveShadow
      >

        <boxGeometry
          args={[
            50,
            0.1,
            5
          ]}
        />

        <meshStandardMaterial
          color="#1e293b"
        />

      </mesh>

      {/* Secondary horizontal road */}

      <mesh
        position={[
          0,
          0.07,
          12
        ]}
        receiveShadow
      >

        <boxGeometry
          args={[
            50,
            0.1,
            4
          ]}
        />

        <meshStandardMaterial
          color="#334155"
        />

      </mesh>

      {/* Secondary vertical road */}

      <mesh
        position={[
          12,
          0.08,
          0
        ]}
        rotation={[
          0,
          Math.PI / 2,
          0
        ]}
        receiveShadow
      >

        <boxGeometry
          args={[
            50,
            0.1,
            4
          ]}
        />

        <meshStandardMaterial
          color="#334155"
        />

      </mesh>

    </group>
  );
}

export default Roads;