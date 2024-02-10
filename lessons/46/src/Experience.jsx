import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Model from "./Model";
import { Suspense } from "react";
import Fox from "./Fox";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <Fox />

      {/* <Suspense
        fallback={
          <mesh position-y={0.6} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe color="red" />
          </mesh>
        }
      >
        <Model />
      </Suspense> */}
    </>
  );
}
