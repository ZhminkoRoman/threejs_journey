import {
  Sparkles,
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  shaderMaterial,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#fff"),
    uColorEnd: new THREE.Color("#000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const backedTexture = useTexture("./model/baked.jpg");
  backedTexture.flipY = false;
  const portalMaterialRef = useRef();

  useFrame((state, delta) => {
    portalMaterialRef.current.uTime += delta;
  });
  return (
    <>
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={backedTexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightOne.geometry}
          position={nodes.poleLightOne.position}
          rotation={nodes.poleLightOne.rotation}
          scale={nodes.poleLightOne.scale}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.poleLightTwo.geometry}
          position={nodes.poleLightTwo.position}
          rotation={nodes.poleLightTwo.rotation}
          scale={nodes.poleLightTwo.scale}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
          scale={nodes.portalLight.scale}
        >
          <portalMaterial ref={portalMaterialRef} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  );
}
