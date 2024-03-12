import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// LIGHTS

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
                                                         
const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/*
 * Textures
*/

// loading all the textures to be later used on the mesh as materials
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('textures/door/alpha.jpg');
const doorHeightTexture = textureLoader.load('textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg');
const doorAbientTexture = textureLoader.load('textures/door/ambientOcclusion.jpg');
const matcapTexture = textureLoader.load('textures/matcaps/1.png');
const gradientTexture = textureLoader.load('textures/gradients/3.png');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/*
 Meshes, materials and objects
 */
// material - this will be used for all
//const material = new THREE.MeshBasicMaterial();
//material.map = doorColorTexture;
//material.wireframe = true;
//material.transparent = true;
//material.opacity = 0.5;
//material.side = THREE.DoubleSide; 
/*
 * side method determines which side of the material to show. double side shows both but takes more power and resources, also takes longer
 */

//const material = new THREE.MeshNormalMaterial();
//material.wireframe = true;
//material.transparent = true;
//material.opacity = 0.5;
//material.side = THREE.DoubleSide;
//material.flatShading = true; // so either flatShading works or wireFrame. both cant work simultaneously

//const material = new THREE.MeshMatcapMaterial();
//material.matcap = matcapTexture;

const material = new THREE.MeshStandardMaterial();
material.wireframe = true;
material.metalness = 0.45;
material.roughness = 0.9;
material.side = THREE.DoubleSide;

// geometry
const torusGeometry = new THREE.TorusGeometry(0.25, 0.075, 16, 32);
const planeGeometry = new THREE.PlaneGeometry(0.75, 0.75);
const sphereGeometry = new THREE.SphereGeometry(0.25, 16, 16);

// meshes/objects
const torus = new THREE.Mesh(torusGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);

// add(...) method supports adding of multiple meshes at once
scene.add(torus, plane, sphere);

// transforming the geometries to different co-ordinates
torus.position.y = 1;
sphere.position.y = -1;



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
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

  // update/rotate objects
  torus.rotation.y = 0.25 * elapsedTime;
  plane.rotation.y = 0.25 * elapsedTime;
  sphere.rotation.y = 0.25 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  sphere.rotation.x = -0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
