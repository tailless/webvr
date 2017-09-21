# Coding in Three Dimensions 

Welcome..

Introduction to 3d, WebGL & WebVR.  


- 3D Cartesian Coordinates

![3D Cartesian Coordinates](/images/3D_coordinate_system.png)



## 3D with Javascript - set up :

## What is [Three.js](https://threejs.org/) ?

A javascript 3d library, that abstracts away the complexities of coding 3d/WebGL -  by [Mr. Doob](http://mrdoob.com/)

How to get it : 

- [download](https://threejs.org/build/three.min.js) just the minified build file.

Or :
- [download](https://github.com/mrdoob/three.js/archive/master.zip) entire library, to explore the source and examples.(large file!)
- install via npm & use a module bundler, such as [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/) to build project files:

``` bash $ npm install three ```




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

		<script src="./js/vendor/three.min.js"></script>
		<script src="./js/vendor/WebVR.js"></script>

		<script src="./js/workshop.js"></script>

	</body>
```

## Create the 3D basics

- The  `workshop.js` file in `./js folder`.
- Create the *Scene*,
- the Camera,
- and the Renderer.

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

## Create an 3D object

Make a cube :
- Create a geometry.
- Create a material.
- Create a mesh object, and add the geometry and the material to the mesh.
- Add the mesh to the scene.
- Animate!

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

Declare the mesh at the top, so that it's accessable to us :
``` var mesh; ```

Add to render():
```
   mesh.rotation.x += 0.01;
   mesh.rotation.y += 0.02;
```

## Explore Materials

- Remove the wireframe...
- Pick a material that reflects light.

```
material = new THREE.MeshStandardMaterial({ color: 0x9988ff  });
```

## Turn on the Ligths

```
function createLights() {

	var directionalLight = new THREE.DirectionalLight( 0xffeedd, 1 );
	directionalLight.position.set( -100, 100, 50 );
	scene.add( directionalLight );
	
}
```

## Create a Disco Ball

- Change the geometry to Sphere and change colour of material and turn on flat shading. 
- Add extra lights. 
- Remove rotation on X axis.

Change in createMesh()
```
	geometry = new THREE.SphereGeometry(10, 32, 16);
	material =  new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading:true });
```

Add in createLights()
```
	var light = new THREE.SpotLight( 0xffffff, 0.5);
	light.position.set( 50, -20, -20 );
	scene.add( light );

	var hemisphereLight = new THREE.HemisphereLight( 0x00aaff, 0xff43ff, 1 );
	hemisphereLight.position.set( 0, 100, 0 );
	scene.add( hemisphereLight );
```


## More Complex 3D Models & Maps

- explore the three.js [editor](https://threejs.org/editor/)
- load an .obj file.
- attach a map
- export as json

## Run a localhost

- Install node http-server (in not already installed):
```npm install http-server -g```

- Run HTTP Server:
```http-server . -p 8000```


### Secure connection : serve over HTTPS (optional):

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

### Create Panorama

```
function createPanorama() {
	// panoramic, equirectangular image, projected on the inside of a sphere ( BufferGeometry - for performance )
	var panorama_geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
	// invert the geometry on the x-axis so that all of the faces point inward
	panorama_geometry.scale( - 1, 1, 1 );

	var panorama_material = new THREE.MeshBasicMaterial( {
		map: new THREE.TextureLoader().load( 'textures/south_bank_skate_park_small.jpg' )
	} );

	panorama = new THREE.Mesh( panorama_geometry, panorama_material );
	panorama.matrixAutoUpdate = false;
	panorama.updateMatrix();
	scene.add( panorama );
}
```

###Links:

WebGL:
- http://caniuse.com/#feat=webgl

WebVR:

- https://developers.google.com/web/fundamentals/vr/

