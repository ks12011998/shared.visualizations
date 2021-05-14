import * as THREE from '../libs/three/build/three.module.js';

import { GUI } from '../libs/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../libs/three/examples/jsm/controls/OrbitControls.js'

import Stats from '../libs/three/examples/jsm/libs/stats.module.js';

let stats;

let scene, renderer, camera, cube, controls;
let geometry, mesh;

const dummy = new THREE.Object3D();

const sclX = 100;
const sclZ = 100;


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

	const material = new THREE.MeshNormalMaterial();
	geometry = new THREE.BoxGeometry();
	// will be rescale in the loop
	geometry.scale(1,1,1);
	// instance creation
	mesh = new THREE.InstancedMesh(geometry, material, sclX*sclZ);
	mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame

	const matrix = new THREE.Matrix4();
	let ct = 0;

	for (let i = -sclX/2; i<sclX/2; i++) {
		for (let j = -sclZ/2; j<sclZ/2; j++) {
			// position will be reset in the loop
			matrix.setPosition(i, 0, j);
			mesh.setMatrixAt(ct, matrix);
			ct++;
		}
	}
	scene.add(mesh);

	// camera init position
	camera.position.set(0,0,100);
	
	// light
	const lightAmbient = new THREE.AmbientLight(0xffffff, 0.4);
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
		cubeSize: 3,
	};

	const matChanger = function ( ) {
	};

	const gui = new GUI();
	gui.add( effectController, "cubeSize", 0, 100, 0.1 ).onChange( matChanger );
	gui.close();
	matChanger();

	// STATS
	stats = new Stats();
	document.body.appendChild( stats.dom );

}

function animate() {
	requestAnimationFrame(animate);

	let ct = 0;

	if ( mesh ) {
		const time = Date.now() * 0.001;
		mesh.rotation.x = Math.sin( time / 4 );

		for (let i = -sclX/2; i<sclX/2; i++) {
			for (let j = -sclZ/2; j<sclZ/2; j++) {
					dummy.position.set(i, 0, j);
					dummy.scale.y = Math.random()*10;
					dummy.updateMatrix();
					mesh.setMatrixAt( ct ++, dummy.matrix );
				}
			}
		mesh.instanceMatrix.needsUpdate = true;
	}
	
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
