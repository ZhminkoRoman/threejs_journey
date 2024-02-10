import { useLoader } from "@react-three/fiber";
import { Clone, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default function Model() {
  // const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath("./draco/");
  //   loader.setDRACOLoader(dracoLoader);
  // });

  const model = useGLTF("./hamburger-draco.glb");

  return <Clone object={model.scene} scale={0.35} />;
}

useGLTF.preload("./hamburger-draco.glb");
