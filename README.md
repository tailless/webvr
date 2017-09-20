# Coding in Three Dimensions 

Introduction to 3d, WebGL & WebVR.  

Welcome..


## 3D in Javascript - set up :

### What is [Three.js](https://threejs.org/) ? :

A javascript 3d library, that abstracts away the complexities of coding 3d in javascript -  by [Mr. Doob](http://mrdoob.com/)

How to get it : 

- [download](https://threejs.org/build/three.min.js) just the minified build file.
- [download](https://github.com/mrdoob/three.js/archive/master.zip) entire library, to explore the source and examples.
- use npm 
```$ npm install three ```  & use a module bundler, such as [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/) to build files.



### setup basic HTML + import three.js library

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
		<script src="./js/workshop.js"></script>
	</body>
```

### Create the Scene, Camera & Renderer

Set up the basics of a 3d scene.

```
var scene, camera, renderer;

init();
animate();

function init() {

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

Make a cube and add it to stage -  call from init(), and declare the mesh variable, well need it accessable for later. 

```
var mesh;

function createMesh(){
	var geometry, material;

	geometry = new THREE.BoxGeometry( 20, 20, 20 );
	material =  new THREE.MeshBasicMaterial({ color: 0x9988ff, wireframe: true});

	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 10, -50 );
	scene.add( mesh );
}

```

###Run a localhost



##What is WebVR ?

WebVR is a JavaScript API for creating immersive 3D, Virtual Reality experiences in your browser.


```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```




For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/tailless/webvr/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
