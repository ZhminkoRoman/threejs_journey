import { useEffect } from "react";
import {
  PresentationControls,
  Text3D,
  useGLTF,
  ContactShadows,
  Environment,
  Float,
  Html,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from "three";

const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const model = useGLTF("./model/model.gltf");
  const [matcapTexture] = useMatcapTexture("B6B8B1_994A24_315C81_927963", 256);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  return (
    <>
      <Environment preset="city" />
      <color args={["#091833"]} attach="background" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={model.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://bruno-simon.com/html/" />
            </Html>
          </primitive>
          <group>
            <Text3D
              font="./fonts/helvetiker_regular.typeface.json"
              size={0.25}
              height={0.2}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.01}
              bevelSize={0.01}
              bevelSegments={5}
              bevelOffset={0}
              rotation={[-0.25, -1, 0]}
              position={[2, 0.4, -1]}
              material={material}
            >
              Roman
            </Text3D>
            <Text3D
              font="./fonts/helvetiker_regular.typeface.json"
              size={0.25}
              height={0.2}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.01}
              bevelSize={0.01}
              bevelSegments={5}
              bevelOffset={0}
              rotation={[-0.25, -1, 0]}
              position={[2, 0, -1]}
              material={material}
            >
              Zhminko
            </Text3D>
          </group>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
