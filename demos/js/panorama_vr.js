WEBVR.checkAvailability().catch( function( message ) {

			document.body.appendChild( WEBVR.getMessageContainer( message ) );

		} );

		//

		var camera, renderer, scene;

		init();
		animate();

		function init() {

			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			renderer.vr.enabled = true;

			scene = new THREE.Scene();


			var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
			// invert the geometry on the x-axis so that all of the faces point inward
			geometry.scale( - 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( {
				map: new THREE.TextureLoader().load( 'textures/south_bank_skate_park_small.jpg' )
			} );

			var mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );



			camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
			camera.layers.enable( 1 );

			WEBVR.getVRDisplay( function ( display ) {

				renderer.vr.setDevice( display );

				document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) );

			} );


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
