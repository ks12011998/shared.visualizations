import * as THREE from '../libs/three/build/three.module.js';

import { GUI } from '../libs/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../libs/three/examples/jsm/controls/OrbitControls.js'

import { EffectComposer } from '../libs/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../libs/three/examples/jsm/postprocessing/RenderPass.js';

import Stats from '../libs/three/examples/jsm/libs/stats.module.js';

let stats;

let scene, renderer, camera, cube, sphere, controls, composer, light;


let var1 = 0;
let var2 = 0;
let uniforms;

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
	
	// cube
	const geometryCube = new THREE.BoxGeometry(5,5,5);


	// here pass your fragment shader
	//
	// you'll need 3 things: vertex shader / fragment shader / uniforms (a dictionnary)
	// built in uniforms: same values for all your vertices, can be accessed by both vertex and fragment shaders https://threejs.org/docs/index.html?q=shader#api/en/renderers/webgl/WebGLProgram

	// defining res, mouse and time
	
	
	// init uniforms
	uniforms = {
						//u_resolution: { value: new THREE.Vector2(200,300) },
						//u_mouse: { value: new THREE.Vector2(200,300) },
						var1: { value: 0.5 },
						var2: { value: 0.1 },
					};

	const materialCube = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: document.getElementById( 'vertexShader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentShader' ).textContent
				} );

	
	//
	//
	cube = new THREE.Mesh(geometryCube, materialCube);

	
	scene.add(cube);


	// camera init position
	camera.position.set(0,0,100);

	
	// light
	const lightAmbient = new THREE.AmbientLight(0xffffff, 0.4);
	scene.add(lightAmbient);

	// background
	const colorBackground = new THREE.Color("#fff")
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

	// PostProcessing
	/*
	composer = new EffectComposer( renderer );
	composer.addPass( new RenderPass( scene, camera ) );

	glitchPass = new GlitchPass();
	glitchPass.goWild = false;
	glitchPass.curF = 0;

	composer.addPass( glitchPass );
	*/

	// GUI Controller
	const effectController = {
		cubeSize: 3,
		curF: 0
	};

	const matChanger = function ( ) {
		cube.scale.x = effectController.cubeSize;
		cube.scale.y = effectController.cubeSize;
		cube.scale.z = effectController.cubeSize;
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

	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;

	//cube.material.uniforms.u_resolution = u_resolution;
	//cube.material.uniforms.u_mouse = u_mouse;
	var1+=0.01;
	var2+=0.001;

	console.log(var1,var2);

	cube.material.uniforms.var1.value = var1;
	cube.material.uniforms.var2.value = var2;
	
	camera.lookAt( scene.position );
	controls.update();
	renderer.render(scene, camera);

	//composer.render();

	stats.update();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight ;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
	//composer.setSize( window.innerWidth, window.innerHeight );

}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
