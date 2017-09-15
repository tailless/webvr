# Coding in three dimensions 

Introduction to Web 3d & WebVR 

Welcome..


## coding 3D for the browser - the set up :

### What is [Three.js](https://threejs.org/) ? :

A javascript 3d library, that abstracts away the complexities of coding 3d in javascript -  by [Mr. Doob](http://mrdoob.com/)

How to get it : 
- [download](https://threejs.org/build/three.min.js) just the minified build file.
- [download](https://github.com/mrdoob/three.js/archive/master.zip) entire library, to explore the source and examples.
- use npm 
```$ npm install three ```  & use a module bundler, such as [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/) to build files.



### setup very basic HTML + import three.js library

```
	<!DOCTYPE html>
	<meta charset="utf-8">
	<body>
	<script src="./js/three.min.js"></script>
  
```

### write some javascript 

```
var scene, camera, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry( 200, 200, 200 );
    material = new THREE.MeshNormalMaterial( { color: 0x21FFD3, wireframe: false } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

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
