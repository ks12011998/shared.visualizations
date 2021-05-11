import * as THREE from '../libs/three/build/three.module.js';

import { GUI } from '../libs/three/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from '../libs/three/examples/jsm/controls/OrbitControls.js'

import { GLTFLoader } from '../libs/three/examples/jsm/loaders/GLTFLoader.js'

console.log("hey three with modules");

const loader = new GLTFLoader();

let scene, renderer, camera, cube, sphere, controls;

let theta = 0;
let radius = 10;

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
	document.body.appendChild(renderer.domElement);

	// TEXT MESH
	const colorText = new THREE.Color("hsl(130, 100%, 20%)");
	loader.load( '../static/3d/glitch.glb', function ( gltf ) {

		gltf.asset;
		gltf.scene.traverse( function ( child ) {
			if ( child.isMesh ) {
				console.log(child);
				child.scale.z = 20;
				child.scale.x = 20;
				child.scale.y = 20;
				child.material = new THREE.MeshBasicMaterial( {color: colorText} ); 
				scene.add(child);
			}
		});
		//scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

	// cube
	const colorCube = new THREE.Color("hsl(0,50%,90%)")
	const geometry = new THREE.BoxGeometry(1,1,1);
	const material = new THREE.MeshPhongMaterial( {color: colorCube} );
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// sphere
	const colorFrame = new THREE.Color("hsl(300,50%,50%)");
	const geometry2 = new THREE.SphereGeometry(50);
	const edges = new THREE.EdgesGeometry(geometry2);
	const material2 = new THREE.MeshBasicMaterial({color: colorFrame, opacity:1, transparent:true});
	sphere = new THREE.LineSegments(edges, material2);
	scene.add(sphere);

	// camera init position
	camera.position.set(0,0,100);

	// light
	const lightAmbient = new THREE.AmbientLight(0xffffff, 0.4);
	/*
	const lightPoint = new THREE.PointLight(0xffffff, 1, 1000);
	lightPoint.position.set(10,10,10);
	*/
	scene.add(lightAmbient);

	// background
	const colorBackground = new THREE.Color("hsl(200,60%,80%)")
	scene.background = colorBackground;

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
		cubeSize: 3
	};

	const matChanger = function ( ) {
		cube.scale.x = effectController.cubeSize;
		cube.scale.y = effectController.cubeSize;
		cube.scale.z = effectController.cubeSize;
	};

	const gui = new GUI();
	gui.add( effectController, "cubeSize", 0, 10, 0.1 ).onChange( matChanger );
	gui.close();
	matChanger();
}

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;

	//cube.position.z -= 0.1;

	sphere.rotation.x += 0.001;
	sphere.rotation.y += 0.001;

	theta += 1;
	/*
	camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
	//camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
	*/

	//camera.position.z -= 0.01;
	camera.lookAt( scene.position );

	controls.update();

	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight ;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
