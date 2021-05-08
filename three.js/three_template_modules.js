import * as THREE from '../libs/three/build/three.module.js';

import { GUI } from '../libs/three/examples/jsm/libs/dat.gui.module.js';

import { EffectComposer } from "../libs/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from '../libs/three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from '../libs/three/examples/jsm/postprocessing/BokehPass.js';


console.log("hey three with modules");

let width = window.innerWidth;
let height = window.innerHeight;

let scene, renderer, camera, cube, sphere;

let theta = 0;
let radius = 10;

const postprocessing = {};

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
	const colorCube = new THREE.Color("hsl(0,50%,90%)")
	const geometry = new THREE.BoxGeometry(70,70,70);
	const material = new THREE.MeshPhongMaterial( {color: colorCube} );
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// sphere
	const colorFrame = new THREE.Color("hsl(300,50%,50%)");
	const geometry2 = new THREE.SphereGeometry(200);
	const edges = new THREE.EdgesGeometry(geometry2);
	const material2 = new THREE.MeshBasicMaterial({color: colorFrame, opacity:1, transparent:true});
	sphere = new THREE.LineSegments(edges, material2);
	scene.add(sphere);

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

	camera.position.z = 200;
	camera.lookAt(scene.position);

	initPostprocessing();



	// GUI Controller
	const effectController = {
		focus: 500.0,
		aperture: 5,
		maxblur: 0.01
	};

	const matChanger = function ( ) {
		postprocessing.bokeh.uniforms[ "focus" ].value = effectController.focus;
		postprocessing.bokeh.uniforms[ "aperture" ].value = effectController.aperture * 0.00001;
		postprocessing.bokeh.uniforms[ "maxblur" ].value = effectController.maxblur;
	};

	const gui = new GUI();
	gui.add( effectController, "focus", 100, 250, 0.5 ).onChange( matChanger );
	gui.add( effectController, "aperture", 0, 10, 0.1 ).onChange( matChanger );
	gui.add( effectController, "maxblur", 0.0, 0.01, 0.001 ).onChange( matChanger );
	gui.close();
	matChanger();
}

function initPostprocessing() {

	const renderPass = new RenderPass( scene, camera );

	const bokehPass = new BokehPass( scene, camera, {
		focus: 30,
		aperture: 0.1,
		maxblur: 0.01,

		width: width,
		height: height
	} );

	const composer = new EffectComposer( renderer );

	composer.addPass( renderPass );
	composer.addPass( bokehPass );

	postprocessing.composer = composer;
	postprocessing.bokeh = bokehPass;
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

	renderer.render(scene, camera);

	postprocessing.composer.render( 0.1 );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight ;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
