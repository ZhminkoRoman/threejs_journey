import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";

export default function Experience() {
  const cubeRef = useRef();
  const twister = useRef();
  const [hitSound] = useState(() => new Audio("./hit.mp3"));

  const cubeJump = useCallback(() => {
    if (cubeRef.current) {
      cubeRef.current.applyImpulse({ x: 0, y: 4, z: 0 });
      cubeRef.current.applyTorqueImpulse({
        x: Math.random() * 0.5,
        y: Math.random() * 0.5,
        z: Math.random() * 0.5,
      });
    }
  }, [cubeRef]);

  const collisionEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const angle = time * 0.5;
    const x = Math.sin(angle) * 2;
    const z = Math.cos(angle) * 2;

    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    if (twister.current) {
      twister.current.setNextKinematicRotation(quaternionRotation);
      twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
    }
  });
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug>
        <RigidBody colliders="ball" restitution={1}>
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* <RigidBody
          colliders={false}
          position={[0, 1, -0.25]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI * 0.35, 0, 0]}
          />
          <mesh castShadow>
            <torusGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          ref={cubeRef}
          colliders="cuboid"
          position={[1.5, 2, 0]}
          onCollisionEnter={collisionEnter}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          position={[0, -0.8, 0]}
          type="kinematicPosition"
          friction={0}
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
