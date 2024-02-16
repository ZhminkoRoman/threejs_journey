import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <VRButton />
    <Canvas
      className="r3f"
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [3, 2, -4],
      }}
      shadows
    >
      <XR>
        <Controllers />
        <Experience />
      </XR>
    </Canvas>
  </>
);
