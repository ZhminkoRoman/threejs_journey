import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {};
loadingManager.onLoad = () => {};
loadingManager.onProgress = () => {};
loadingManager.onError = () => {};

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const heightTexture = textureLoader.load("textures/door/height.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughTexture = textureLoader.load("/textures/door/roughness.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);

colorTexture.colorSpace = THREE.SRGBColorSpace;
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
  map: colorTexture,
  alphaMap: alphaTexture,
  aoMap: ambientTexture,
  normalMap: normalTexture,
  metalnessMap: metalnessTexture,
  roughnessMap: roughTexture,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const ambientLight = new THREE.DirectionalLight("white");
ambientLight.position.set(1, -1, 1);
scene.add(ambientLight);
const hemiLight = new THREE.HemisphereLight("white", "grey");
scene.add(hemiLight);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
