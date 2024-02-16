import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Vignette,
  EffectComposer,
  ToneMapping,
  Glitch,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";

export default function Experience() {
  return (
    <>
      <EffectComposer disableNormalPass multisampling={0}>
        {/* <Bloom mipmapBlur /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focusLength={0.025}
          bokehScale={6}
        /> */}
        {/* <ToneMapping /> */}
      </EffectComposer>
      <Perf position="top-left" />

      {/* <color attach="background" args={["black"]} /> */}

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}