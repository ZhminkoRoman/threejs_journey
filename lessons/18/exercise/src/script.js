import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 400 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const light = new THREE.PointLight("#fff", 3, 7);
// light.position.set(2, 2, 2);
/**
 * Void
 */

const textureLoader = new THREE.TextureLoader();

// const matcapTexture = textureLoader.load("./textures/matcaps/55.png");
// matcapTexture.colorSpace = THREE.SRGBColorSpace;

const voidGroup = new THREE.Group();
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const sphereMaterial = new THREE.MeshStandardMaterial();
// sphereMaterial.shininess = 10;
// sphereMaterial.matcap = matcapTexture;
// sphereMaterial.color = new THREE.Color("black");
// sphereMaterial.emissive = new THREE.Color("black");
// sphereMaterial.emissiveIntensity = 1;
// sphereMaterial.shininess = 300;
// sphereMaterial.specular = "#fff";
// sphereMaterial.roughness = 0;
// sphereMaterial.wireframe = true;
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
voidGroup.add(sphere);
// voidGroup.add(light);
// light.add(sphere);
// sphere.add(light);
scene.add(voidGroup);
// scene.add(light);

/**
 * Galaxy
 */

const parameters = {};
parameters.count = 150000;
parameters.size = 0.012;
parameters.radius = 5;
parameters.branches = 4;
parameters.spin = 2;
parameters.randomness = 0.4;
parameters.randomnessPower = 1.5;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";
parameters.spread = 1.4;

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();
  material = new THREE.PointsMaterial();

  material.size = parameters.size;
  material.sizeAttenuation = true;
  material.depthWrite = false;
  material.blending = THREE.AdditiveBlending;
  material.vertexColors = true;

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
    const spread = parameters.spread * (Math.random() - 0.5) * 1.2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      spread;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      spread *
      parameters.randomness;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      spread;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX; // for the x
    positions[i3 + 1] = randomY; // for the y
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ; // for the z

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spread")
  .min(0.01)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  points.rotation.y = elapsedTime / 16;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
