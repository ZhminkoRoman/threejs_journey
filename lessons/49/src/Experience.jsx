import { useFrame } from "@react-three/fiber";
import { OrbitControls, meshBounds } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = (event) => {
    console.log(event);
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          onClick={(event) => event.stopPropagation()}
        />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5} onClick={eventHandler}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}