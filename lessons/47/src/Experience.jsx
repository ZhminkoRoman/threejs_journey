import { useEffect, useState, useRef } from "react";
import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const groupRef = useRef();
  // C7C0AC_2E181B_543B30_6B6270
  // B6B8B1_994A24_315C81_927963
  const [matcapTexture] = useMatcapTexture("B6B8B1_994A24_315C81_927963", 256);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  useFrame((state, delta) => {
    groupRef.current.children.forEach((donut) => {
      donut.rotation.y += delta * 0.2;
    });
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.03}
          bevelSegments={5}
          bevelOffset={0}
          material={material}
        >
          Roman Zhminko
        </Text3D>
      </Center>

      <group ref={groupRef}>
        {[...Array(100)].map((_, index) => (
          <mesh
            key={index}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            rotation={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            geometry={torusGeometry}
            material={material}
          />
        ))}
      </group>
    </>
  );
}
