import * as THREE from '../libs/three/build/three.module.js';

import { GUI } from '../libs/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../libs/three/examples/jsm/controls/OrbitControls.js'

// rectAreaLight
import { RectAreaLightHelper } from '../libs/three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from '../libs/three/examples/jsm/lights/RectAreaLightUniformsLib.js';

import Stats from '../libs/three/examples/jsm/libs/stats.module.js';

console.log("hey three with modules");


let stats;

let scene, renderer, camera, controls;

let theta = 0;
let radius = 40;

let mesh;
let pointLightMove;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
	70,
	window.innerWidth / window.innerHeight,
	1,
	3000
);

	renderer = new THREE.WebGLRenderer({ antialias : true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);

	// shadows
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	document.body.appendChild(renderer.domElement);


	// adding knot
	const color = new THREE.Color("#fff");
	const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 20);
	const material = new THREE.MeshStandardMaterial({
		color: color, 
		roughness: 0, 
		metalness: 0.8
	});
	mesh = new THREE.Mesh(geometry, material);
	// casting shadows
	mesh.castShadow = true; //default is false
	mesh.receiveShadow = false; //default
	scene.add(mesh);

	// adding Floor
	const width = 300;
	const height = 300;
	const depth = 0.1;
	const colorFloor = new THREE.Color("#fff");
	const floorGeometry = new THREE.BoxGeometry(width,height,depth);
	const floorMaterial = new THREE.MeshStandardMaterial({
		color: colorFloor,
		roughness: 0,
		metalness: 0.8,
	})
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.receiveShadow = true; // receive shadows
	floor.rotation.x = Math.PI/2;
	floor.position.y = -17;
	scene.add(floor);

	// -------------------------- LIGHTS 
	
	// Ambient
	const ambientLight = new THREE.AmbientLight(0xffffff, 1);

	// PointFix
	const pointLightFixColor = new THREE.Color("");
	const pointLightFix = new THREE.PointLight(pointLightFixColor, 5, 100); // color / intensity / distance
	pointLightFix.position.set(-40, 10, 30);

	// adding shadows
	pointLightFix.castShadow = true;
	//Set up shadow properties for the pointLightFix
	pointLightFix.shadow.mapSize.width = 512; // default
	pointLightFix.shadow.mapSize.height = 512; // default
	pointLightFix.shadow.camera.near = 0.5; // default
	pointLightFix.shadow.camera.far = 100; // default


	const sphereSizeFix = 1;
	const pointLightHelperFix = new THREE.PointLightHelper( pointLightFix, sphereSizeFix );

	// PointMove
	const sphere = new THREE.SphereGeometry( 0.5, 16, 8 );

	const pointLightMoveColor = new THREE.Color("purple");
	pointLightMove = new THREE.PointLight(pointLightMoveColor, 10, 100); // color / intensity / distance
	pointLightMove.position.set(
		radius * Math.cos(theta), 
		0, 
		radius * Math.sin(theta));
	pointLightMove.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: pointLightMoveColor } ) ) );

	// RectAreaLight, no shadow support
	const rectAreaLightColor = new THREE.Color("#3ab5ff");
	const rectLight = new THREE.RectAreaLight( rectAreaLightColor, 40, 10, 100); // color, intensity, width, height
	rectLight.position.set(60, 0, 0);
	rectLight.lookAt(0,0,0);
	const rectLightHelper = new RectAreaLightHelper( rectLight );

	
	// ------------------------- LIGHTS ADDITION
	//scene.add(lightAmbient);
	scene.add(pointLightFix);
	scene.add(pointLightHelperFix);
	scene.add(pointLightMove);
	scene.add(rectLight)
	rectLight.add(rectLightHelper);


	// background
	const colorBackground = new THREE.Color("#000")
	scene.background = colorBackground;

	// camera init position
	camera.position.set(0,0,50);
	
	
	
	// CONTROLS
	controls = new OrbitControls( camera, renderer.domElement );
	controls.listenToKeyEvents( window );

	controls.enableDamping = true; 
	controls.dampingFactor = 0.05;
	controls.screenSpacePanning = false;
	controls.minDistance = 10;
	controls.maxDistance = 500;
	controls.maxPolarAngle = Math.PI / 2;

	
	// GUI Controller
	const effectController = {
	};

	const matChanger = function ( ) {
		};

	const gui = new GUI();
	gui.close();
	matChanger();

	// STATS
	stats = new Stats();
	document.body.appendChild( stats.dom );

}


function animate() {
	requestAnimationFrame(animate);

	// animating PointLightMove
	theta += 0.01;
	pointLightMove.position.x = radius * Math.cos(theta);
	pointLightMove.position.z = radius * Math.sin(theta);

	// animating mesh
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;

	
	camera.lookAt( scene.position );
	controls.update();
	renderer.render(scene, camera);


	stats.update();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight ;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
