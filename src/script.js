import * as THREE from 'three';

// making a canvas
const canvas = document.querySelector('canvas.webgl'); // here we made an empty canvas

// now we must initiate a scene to the canvas that we just created
// scene
const scene = new THREE.Scene();

// an object consists of geometry or the outline or shape of something that we want to render, and a material that we would cover it with
// let's first define the geomerty of that object
const redCubeGeometry = new THREE.BoxGeometry(1,1,1);

// now that we have created the geometry, let's create the material with we want to cover it with
const meshMaterial = new THREE.MeshBasicMaterial({color:'red'});

// now that we have created the cover material and the geometry, let's join them to make the required object or mesh
const cubeMesh = new THREE.Mesh(redCubeGeometry, meshMaterial); // this is the cube object
scene.add(cubeMesh); // added our object to the scene

const sizes ={
  width: 800,
  height: 600
} // created an object for the dimensions

// now that we have created a scene and an object, let's add a camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// as of now, both the camera and the object are at the co-ordinates (0,0,0) in the scene, i.e. their default places after creation
// we must move either of the thing to see out object, so let's move the camera
camera.position.z = 3;
scene.add(camera); // added the camera to the scene

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


