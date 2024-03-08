import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2);
const material = new THREE.MeshBasicMaterial({
  color: 'cyan',
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight 
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/*
 * Resizing the window: after resizing the window we must update the sizes object, updat the camera's aspect ratio, the update matrix
 * and also render the scene again. and after resizing the window since the pixel ratio changes update that as well
* we do that by listening to the resize event of the window
*/
window.addEventListener('resize', () => {
  // updating the sizes object
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // updating the camera's aspect ratio
  camera.aspect = sizes.width /  sizes.height;
  camera.updateProjectionMatrix();

  // update the renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})


/*
 * Fullscreen
*/
window.addEventListener('dblclick', () => {
  // this returns true if we're in fullscreen
  const fullScreenEvent = document.fullscreenElement || document.webkitFullscreenEement; 
  // above fullscreenelement is for all modern browsers and the webkit one is for safari to check if we're in fullscreen or not
  if(!fullScreenEvent){
    // if we're not in fullscreen we're checking whether the fullscreen has been requested or not
    if(canvas.requestFullscreen) // checking for modern browsers
      canvas.requestFullscreen();
    else if(canvas.webkitRequestFullscreen) // checking for safari
      canvas.webkitRequestFullscreen();
  }

  else {
    // if we're in fullscreen now we are checking that whether user has requested to exit it
    if(document.exitFullscreen)
      document.exitFullscreen() ;
    else if(document.webkitExitFullscreen)
      document.webkitExitFullscreen();
  }
}) 


 /*
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// since higher pixel ratios can consume a lot of resources and having pixel ratio of 2 is a very good thing, so we're limiting pixel
// ratios of devices such as mobile phones/tablets that have pixel ratios as high as 5 to the pixel ratio of 2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
