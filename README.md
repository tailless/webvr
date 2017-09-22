# Coding in Three Dimensions 

Welcome..

Introduction to 3d, WebGL & WebVR.  



## 3D with Javascript - set up :

## What is [Three.js](https://threejs.org/) ?

A javascript 3d library, that abstracts away the complexities of coding 3d & the WebGL API -  by [Mr. Doob](http://mrdoob.com/)

How to get it : 

- [download](https://threejs.org/build/three.min.js) just the minified build file.

Or :
- [download](https://github.com/mrdoob/three.js/archive/master.zip) entire library, to explore the source and examples.(large file!)

- install via npm & use a module bundler, such as [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/) to build project files:
``` 
$ npm install three
```


## The basic HTML

- The `index.html` file
- import three.js minified library
- import a WebVR utility script
- import our JS workshop code

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

		<script src="./js/three.min.js"></script>
		<script src="./js/WebVR.js"></script>

		<script src="./js/workshop.js"></script>

	</body>
```

## Create the 3D basics

- Open the `workshop.js` file in `./js folder`
- Create a Scene, a Camera, and a Renderer

```
var scene, camera, renderer;

init();
animate();

function init() {

	setTheScene();
	
	//createMesh();
	//createLights();
	//loadModel();
	
	//createPanorama();
	//enableVR();
	
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

- Open file in your WebGL capable [browser](http://caniuse.com/#feat=webgl)
- Open the Dev Tools and inspect the Scene by typing **scene** in the console



## Create an 3D object

Make a cube :
- Create a geometry
- Create a material
- Create a mesh object, and add the geometry and the material to the mesh
- Add the mesh to the scene

```
function createMesh(){
	var geometry, material;

	geometry = new THREE.BoxGeometry( 20, 20, 20 );
	material =  new THREE.MeshBasicMaterial({ color: 0x9988ff, wireframe: true});

	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 10, -50 );
	scene.add( mesh );
}
```

- Declare the mesh at the top, so that it's accessable to us
``` 
var mesh; 
```

- Add to render() to animate
```
   mesh.rotation.x += 0.01;
   mesh.rotation.y += 0.02;
```

### A Note on 3D Space

- The **Z** dimension - 3D Cartesian Coordinates

![3D Cartesian Coordinates](/images/3D_coordinate_system.png)


## Explore Materials

- Remove the wireframe...
- Pick a material that reflects light.

```
material = new THREE.MeshStandardMaterial({ color: 0x9988ff  });
```

## Turn on the Ligths

- Add light to the scene

```
function createLights() {

	var directionalLight = new THREE.DirectionalLight( 0xffeedd, 1 );
	directionalLight.position.set( -100, 100, 50 );
	scene.add( directionalLight );
	
}
```

## Create a Disco Ball

- Change the geometry to Sphere and change colour of material and turn on flat shading in createMesh()
```
	geometry = new THREE.SphereGeometry(10, 32, 16);
	material =  new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading:true });
```

- Add extra lights in createLights()
```
	var light = new THREE.SpotLight( 0xffffff, 0.5);
	light.position.set( 50, -20, -20 );
	scene.add( light );

	var hemisphereLight = new THREE.HemisphereLight( 0x00aaff, 0xff43ff, 1 );
	hemisphereLight.position.set( 0, 100, 0 );
	scene.add( hemisphereLight );
```

- Remove rotation on X axis in render()


## More Complex 3D Models & Maps

- explore the three.js [editor](https://threejs.org/editor/)
- load a 3D model (`./models/Cirno.obj`)
- attach a diffusion map texture(`/models/cirno_d.tga`)
- export model with map as json


## Run a localhost

- Install node http-server ( if not already installed ):
```
npm install http-server -g
```

- Navigate to workshop folder, then run http server:
```
http-server . -p 8000
```


### Establish secure connection - serve over HTTPS (optional):

This step is optional, but you will get a warning in Chrome later on if accessing the WebVR API over an insecure connection.

- Navigate to workshop folder
- Create the cert-key pair files (valid for roughly 10 years)
```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

- ..then run https server:
```
http-server -p 8000  -ssl -cert cert.pem 
```


## Import the model

- Load the girl json file (./models/cirno.json)
- Position the model
- Add to Scene

```
function loadModel(){

	// loading model
	var loader = new THREE.ObjectLoader();

	loader.load(
		// resource URL
		"models/cirno.json",

		// pass the loaded data to the onLoad function.
		function ( obj ) {
			// add the loaded object to the scene
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
```

- Declare a referece to the girl model
```
var girl;
```

- so that we can animate her in render()
```
if(girl){
	girl.rotation.y -= 0.01;
}
```

## Create Panorama

- Create a Sphere geometry (using BufferGeometry for performance )
- Invert the geometry on the x-axis so that all of the faces point inward, so that the image projects on the inside of a sphere 
- Create basic material with a map
- Load a panoramic, [equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection) image as map texture
- Attach geometry & material to a mesh, 
- Disable matrixAutoUpdate (performance) - our mesh will not move
- Add panorama mesh to scene

```
function createPanorama() {
	
	var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
	geometry.scale( - 1, 1, 1 );

	var material = new THREE.MeshBasicMaterial( {
		map: new THREE.TextureLoader().load( 'textures/south_bank_skate_park_small.jpg' )
	} );

	panorama = new THREE.Mesh( geometry, material );
	panorama.matrixAutoUpdate = false;
	scene.add( panorama );
}
```
Images by Jon Davey(http://jondavey.com/)

## WebVR ?

WebVR is a JavaScript API for creating immersive 3D, Virtual Reality experiences in your browser.

[Experimental feature](http://caniuse.com/#feat=webvr), enabel in Chrome(59+) by setting chrome://flags#enable-webvr ,
or for live projects, request a [Origin Token](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md) to enable by default on your domain.


- Enable VR in renderer
- Use the WebVR helper script to detect the device capabilities

```
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

```

## Get your device ready

- Android Phone with the Google VR Services app installed ( requires Android OS version 6+ Marshmallow )
- Chrome browser
- VR Goggles
- Make sure you have your laptop and phone connected to the same network
- Use Chrome to navigate to your laptop's IP address + port number, i.e 192.168.0.2:8000 
- Fingers crossed, you can now enjoy your master piece :)




### Links:


WebVR:
- [mozvr.com](https://mozvr.com/)
- [developers.google.com/web/fundamentals/vr](https://developers.google.com/web/fundamentals/vr/)

