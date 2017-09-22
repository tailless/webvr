//the basics
var scene, camera, renderer;

var mesh, girl;

init();
animate();

function init() {

	setTheScene();

	createMesh();
	createLights();
	//loadModel();
	createPanorama();
	//enableVR();

}

function setTheScene(){
	// set up the scene, the camera and the renderer

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
	//camera.layers.enable( 1 );
	//camera.position.z = 10;

	//create renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function createMesh(){
	var geometry, material;

	//geometry = new THREE.BoxGeometry( 20, 20, 20 );
	geometry = new THREE.SphereGeometry(10, 32, 16);

	//material = new THREE.MeshNormalMaterial({wireframe: false});
	//material =  new THREE.MeshBasicMaterial({ color: 0x9988ff, wireframe: true});

	material =  new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading:true });
	//material = new THREE.MeshPhongMaterial( {color: 0x9988ff} );

	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 10, -50 );
	scene.add( mesh );
}

function createLights() {

	var directionalLight = new THREE.DirectionalLight( 0xffeedd, 0.8 );
	directionalLight.position.set( -100, 100, 0 );
	scene.add( directionalLight );

	// then..
	var light = new THREE.SpotLight( 0xffffff, 0.5);
	light.position.set( 50, -20, -20 );
	scene.add( light );

	var hemisphereLight = new THREE.HemisphereLight( 0x00aaff, 0xff43ff, 1 );
	hemisphereLight.position.set( 0, 100, 0 );
	scene.add( hemisphereLight );

}

function loadModel(){

	// loading model
	var loader = new THREE.ObjectLoader();

	loader.load(
		// resource URL
		"models/cirno.json",

		// pass the loaded data to the onLoad function.
		//Here it is assumed to be an object
		function ( obj ) {
			//add the loaded object to the scene
			obj.position.set( 120, -100, -170 );
			obj.scale.set( 0.1, 0.1, 0.1 );

			scene.add( obj );

			girl = obj;
		},

		// Function called when download progresses
		function ( xhr ) {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},

		// Function called when download errors
		function ( xhr ) {
			console.error( 'An error happened' );
		}
	);

}


function enableVR(){

	//enable the renderer
	renderer.vr.enabled = true;

	// check if WebVR API is available
	WEBVR.checkAvailability().catch( function( message ) {

		document.body.appendChild( WEBVR.getMessageContainer( message ) );

	} );

	//check if there is a VR Display connected/enabled..
	WEBVR.getVRDisplay( function ( display ) {

		renderer.vr.setDevice( display );

		document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) );

	} );
}

function createPanorama() {
	// panoramic, equirectangular image, projected on the inside of a sphere ( BufferGeometry - for performance )
	var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale( - 1, 1, 1 );

	var material = new THREE.MeshBasicMaterial( {
		map: new THREE.TextureLoader().load( 'textures/south_bank_skate_park_small.jpg' )
	} );

	panorama = new THREE.Mesh( geometry, material );
	panorama.matrixAutoUpdate = false;
	//panorama.updateMatrix();
	scene.add( panorama );

}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	renderer.animate( render );

}

function render() {

	if(mesh){
		//mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.01;
	}

	if(girl){
		girl.rotation.y -= 0.01;
	}

	renderer.render( scene, camera );

}
