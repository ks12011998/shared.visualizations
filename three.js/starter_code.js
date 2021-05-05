console.log("hello three");

let scene, renderer, camera, cube;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
	75, // FOV
	window.innerWidth / window.innerHeight, // aspect ratio
	0.1, // near plane
	1000 // far plane
);

	// there are several types of renderer, here we're using the webgl renderer

	// passing antialiasing
	renderer = new THREE.WebGLRenderer({ antialias : true });

	// renderer has a size
	renderer.setSize(window.innerWidth, window.innerHeight);


	// adding the renderer to the body, vanilla javascript
	document.body.appendChild(renderer.domElement);

	// the geometry
	// play with this params
	const geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
	const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// the camera has to be repositioned, otherwise it's in the cube
	camera.position.z = 10;
	camera.position.x = 0;
	camera.position.y = 0;
}


// The animate function will always be required to render the scene (every frame on screen refresh ~60fps)
function animate() {
	// this is a loop
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	// camera.position.x += 0.01;

	renderer.render(scene, camera);
}

// handling responsiveness
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight ;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


// adding the listener
window.addEventListener("resize", onWindowResize, false);

init();
animate();
