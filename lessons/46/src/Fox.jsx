import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Fox() {
  const [action, setAction] = useState();
  const foxRef = useRef();

  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  useEffect(() => {
    setAction(animations.actions.Run);
  }, [animations]);

  window.addEventListener("click", (event) => {
    if (action) {
      action.reset().fadeOut(0.5).play();
      // foxRef.current.position.x += 0.1;
    }
  });

  return (
    <primitive
      ref={foxRef}
      object={fox.scene}
      scale={0.01}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
}

useGLTF.preload("./Fox/glTF/Fox.gltf");
