import * as THREE from '../libs/three/build/three.module.js';

console.log("hey three");

let scene, renderer, camera, cube, sphere;

let theta = 0;
let radius = 10;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

	renderer = new THREE.WebGLRenderer({ antialias : true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// cube
	const colorCube = new THREE.Color("hsl(0,50%,90%)")
	const geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
	const material = new THREE.MeshPhongMaterial( {color: colorCube} );
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// sphere
	const colorFrame = new THREE.Color("hsl(300,50%,50%)");
	const geometry2 = new THREE.SphereGeometry(3);
	const edges = new THREE.EdgesGeometry(geometry2);
	const material2 = new THREE.MeshBasicMaterial({color: colorFrame, opacity:1, transparent:true});
	sphere = new THREE.LineSegments(edges, material2);
	scene.add(sphere);

	// light
	//const lightAmbient = new THREE.AmbientLight(0xffffff, 1);
	const lightPoint = new THREE.PointLight(0xffffff, 1, 1000);
	lightPoint.position.set(10,10,10);
	scene.add(lightPoint);

	scene.add(lightPoint);

	// background
	const colorBackground = new THREE.Color("hsl(200,60%,80%)")
	scene.background = colorBackground;

	camera.position.z = radius;
}

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;

	sphere.rotation.x += 0.001;
	sphere.rotation.y += 0.001;

	theta += 1;
	camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
	//camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
	camera.lookAt( scene.position );

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
