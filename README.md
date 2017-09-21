# Coding in Three Dimensions 

Welcome..

Introduction to 3d, WebGL & WebVR.  




## 3D in Javascript - set up :

### What is [Three.js](https://threejs.org/) ? :

A javascript 3d library, that abstracts away the complexities of coding 3d in javascript -  by [Mr. Doob](http://mrdoob.com/)

How to get it : 

- [download](https://threejs.org/build/three.min.js) just the minified build file.

Other :
- [download](https://github.com/mrdoob/three.js/archive/master.zip) entire library, to explore the source and examples.(large file!)
- install via npm & use a module bundler, such as [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/) to build project files:
```$ npm install three```




### setup basic HTML + import three.js library

- Make a index.html file.

```
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>webvr workshop</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
		<style>
			body {
				background-color: #101010;
				margin: 0px;
				overflow: hidden;
			}
		</style>
	</head>

	<body>
		<script src="./three.min.js"></script>
		<script src="./workshop.js"></script>
	</body>
```

### Create the 3D basics
- Set up the Scene, Camera & Renderer of a 3d project.

```
var scene, camera, renderer;

init();
animate();

function init() {
	// set up the scene, the camera and the renderer
	setTheScene();
	
}

function setTheScene(){

	//set up scene
	scene = new THREE.Scene();

	//create camera
	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );

	//create renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

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

	renderer.render( scene, camera );

}
```

### Create an 3D object

- Make a cube geometry, attach a material add it to a mesh.
- Declare the mesh variable at top, well need it accessable. Add mesh to the scene.
- Make it move!

```
var mesh;

//in init()
	createMesh()
	

function createMesh(){
	var geometry, material;

	geometry = new THREE.BoxGeometry( 20, 20, 20 );
	material =  new THREE.MeshBasicMaterial({ color: 0x9988ff, wireframe: true});

	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 10, -50 );
	scene.add( mesh );
}

//in render()
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
```

### Explore Materials

- Remove the wireframe...
- Pick a material that reflects light.

```
material =  new THREE.MeshStandardMaterial({ color: 0x9988ff  });
```

### Turn on the Ligths

```
//in init()
	createLights()

function createLights() {

	var directionalLight = new THREE.DirectionalLight( 0xffeedd, 1 );
	directionalLight.position.set( -100, 100, 50 );
	scene.add( directionalLight );
	
}
```

### Create a Disco Ball

- Change the geometry to Sphere and change colour of material and turn on flat shading. 
- Add extra lights. 
- Remove rotation on X axis and slow down on Y axis.

```
//in createMesh()
	geometry = new THREE.SphereGeometry(10, 32, 16);
	material =  new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading:true });

//in createLights()
	var light = new THREE.SpotLight( 0xffffff, 0.5);
	light.position.set( 50, -20, -20 );
	scene.add( light );

	var hemisphereLight = new THREE.HemisphereLight( 0x00aaff, 0xff43ff, 1 );
	hemisphereLight.position.set( 0, 100, 0 );
	scene.add( hemisphereLight );

//in render()
	//mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
  
```

### More Complex Scene & Models

- explore the three.js [editor](https://threejs.org/editor/)
- 

### Run a localhost

..python: 

```
# Python 3.x
python -m http.server

# Python 2.x
python -m SimpleHTTPServer

```

..or node http-server:

```
npm install http-server -g

http-server . -p 8000

```

 Secure connection : serve over HTTPS (optional):

- create the cert-key pair files :

`openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`

( This generates a cert-key pair and it will be valid for roughly 10 years (3650 days to be exact).)

..then run:

`http-server -p 8000  -ssl -cert cert.pem `


### IMPORT A MODEL

- [Cirno](https://github.com/tailless/webvr/blob/master/demos/models/cirno.json)

```
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

			cirno = obj;
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
```


### WebVR ?

WebVR is a JavaScript API for creating immersive 3D, Virtual Reality experiences in your browser.

Experimental feature, enabel in Chrome : chrome://flags#enable-webvr

- http://caniuse.com/#feat=webvr

###Links:

WebGL:
- http://caniuse.com/#feat=webgl

WebVR:

- https://developers.google.com/web/fundamentals/vr/

