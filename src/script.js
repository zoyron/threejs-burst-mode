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
//cubeMesh.position.x = 0.7; // here 1 could be of any unit depending upon the project you're making
//cubeMesh.position.y = -0.6;
//cubeMesh.position.z = 1;
// instead of the setting position like above, we can use the set method
cubeMesh.position.set(0.7, -0.6, 1);
// let's say you're making a house project and you decided the units should be foot, just decided it and stick to it, no need to specify
// in the code, and let's say you're building a landscape, you can just decide the units would ke in Kilometers. The catch here is to
// stick to it. So if you decided that units are in meters, and you need to use somehing in 1Km, then put value as 1000 because you have 
// stick to the unit you're decided for yourself in your mind




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






















