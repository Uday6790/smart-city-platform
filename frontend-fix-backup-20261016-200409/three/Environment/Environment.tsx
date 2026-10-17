import {
  Grid
} from "@react-three/drei";

function Environment() {

  return (
    <>

      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0
        ]}
        position={[
          0,
          -0.1,
          0
        ]}
        receiveShadow
      >

        <planeGeometry
          args={[
            100,
            100
          ]}
        />

        <meshStandardMaterial
          color="#334155"
        />

      </mesh>

      <Grid
        args={[
          100,
          100
        ]}
        cellSize={1}
        cellThickness={0.5}
        sectionSize={5}
        sectionThickness={1}
        fadeDistance={60}
        fadeStrength={1}
        position={[
          0,
          0,
          0
        ]}
      />

    </>
  );
}

export default Environment; 