import type { Building } from "../../types/city";
import { Text } from "@react-three/drei";

interface BuildingsProps {
  buildings: Building[];
}

function Buildings({
  buildings,
}: BuildingsProps) {
  return (
    <>
      {buildings.map((building) => {
        const height = building.height || 8;
        const width = building.width || 5;
        const depth = building.depth || 5;

        return (
          <group key={building.id}>

            {/* =========================
                MAIN BUILDING
               ========================= */}

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
                args={[
                  width,
                  height,
                  depth,
                ]}
              />

              <meshStandardMaterial
                color={
                  building.color || "#2563eb"
                }
                roughness={0.7}
                metalness={0.1}
              />
            </mesh>

            {/* =========================
                ROOF
               ========================= */}

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

              <meshStandardMaterial
                color="#334155"
                roughness={0.6}
              />
            </mesh>

            {/* =========================
                BUILDING NAME
               ========================= */}

            <Text
              position={[
                building.xPosition,
                height + 1.1,
                building.zPosition,
              ]}
              fontSize={0.55}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#020617"
            >
              {building.name}
            </Text>

          </group>
        );
      })}
    </>
  );
}

export default Buildings;