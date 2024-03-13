import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// debug GUI
const gui = new GUI();

// getting the canvas
const canvas = document.querySelector('canvas.webgl');

// adding the scene
const scene = new THREE.Scene();


