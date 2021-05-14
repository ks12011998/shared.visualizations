// Making out a gif
// https://bleuje.github.io/tutorial1/
// step 1: writting a loop with sin function
// step 2: capturing with CCapture lib
// step 3: convert with ImageMagick
// convert -delay 4 -loop 0 *.png animation.gif

import * as THREE from '../libs/three/build/three.module.js';
import { SimplexNoise } from '../libs/three/examples/jsm/math/SimplexNoise.js';

let capturer = new CCapture({ 
	format: 'png',
	framerate: 60,
});

//capturer.start();

let scene, renderer, camera;
let points;
let canvas;

const simplex = new SimplexNoise();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
	70,
	//window.innerWidth / window.innerHeight,
	1,
	1,
	3000
);

	renderer = new THREE.WebGLRenderer({ antialias : true });
	renderer.setPixelRatio( window.devicePixelRatio );
	//renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setSize(500,500);
	canvas = document.body.appendChild(renderer.domElement);

	const fac = 5;

	// noise
	let xOff = 0;
	let yOff = 0;
	let zOff = 10;

	const xInc = 0.03;
	const yInc = 0.001;
	const zInc = 0.01; 

	// target positions
	const morphPositions0 = [];
	const morphPositions1 = [];

	const stepTheta = 0.06;
	const stepPhi = 0.06;

	const geometry = new THREE.BufferGeometry();
	let positions = [];

	// empty array for morphing
	geometry.morphAttributes.position = [];

	let radius = 7;

	for (let i = 0; i<2*Math.PI; i+=stepTheta) {
		for (let j = 0; j<2*Math.PI; j+=stepPhi) {
			
			let theta = i+Math.random()*0.2;
			let phi = j+Math.random()*0.2;

			let x = radius * Math.cos(phi) * Math.sin(theta);
			let y = radius * Math.sin(phi) * Math.sin(theta);
			let z = radius * Math.cos(theta);

			positions.push(x, y, z);

			let x2 = (radius + THREE.MathUtils.mapLinear(simplex.noise3d(xOff,yOff,zOff),-1,1,-3,3)) * Math.cos(phi) * Math.sin(theta);
			let y2 = (radius + THREE.MathUtils.mapLinear(simplex.noise3d(xOff, yOff,zOff),-1,1,-3,3)) * Math.sin(phi) * Math.sin(theta);
			let z2 = (radius + THREE.MathUtils.mapLinear(simplex.noise3d(xOff, yOff,zOff),-1,1,-3,3)) * Math.cos(theta);

			morphPositions0.push(x2, y2, z2);
			xOff += xInc;
		}
		xOff = 0;
		yOff += yInc;
	}
	
	// setting the attributes
	geometry.setAttribute( 'position', new THREE.Float32BufferAttribute(positions, 3));
	geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(morphPositions0, 3);
	//geometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(morphPositions1, 3);

	const material = new THREE.PointsMaterial({ 
		color: 0xFFFFFF,
		size: 0.05,
		morphTargets: true,
	});

	points = new THREE.Points( geometry, material );
	scene.add( points );	

	// camera init position
	camera.position.set(0,0,20);
	
	// light
	const lightAmbient = new THREE.AmbientLight(0xffffff, 1);
	scene.add(lightAmbient);

	// background
	const colorBackground = new THREE.Color("#000")
	scene.background = colorBackground;
}

let value = 0;

function animate() {
	requestAnimationFrame(animate);
	camera.lookAt( scene.position );
	renderer.render(scene, camera);
	
	// rad from 0 to 360
	value ++;

	if (value<=360) {
		points.morphTargetInfluences[0] = Math.abs(Math.sin(THREE.MathUtils.degToRad(value)));
		points.rotation.y = Math.sin(THREE.MathUtils.degToRad(value));
		points.rotation.x = Math.sin(THREE.MathUtils.degToRad(value));
		capturer.capture(canvas);
	}
	else {
		capturer.stop();
		capturer.save();
	}
	

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight ;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
