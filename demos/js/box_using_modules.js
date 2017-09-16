//import * as THREE from 'three'; // import all
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three';

var scene, camera, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    scene = new Scene();

    camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new BoxGeometry( 200, 200, 200 );
    material = new MeshNormalMaterial( { color: 0x21FFD3, wireframe: false } );

    mesh = new Mesh( geometry, material );
    scene.add( mesh );

    renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}
