import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';


function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	renderer.setSize(window.innerWidth,window.innerHeight);

	const fov = 105;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 1, 2, -25 );

	class MinMaxGUIHelper {

		constructor( obj, minProp, maxProp, minDif ) {

			this.obj = obj;
			this.minProp = minProp;
			this.maxProp = maxProp;
			this.minDif = minDif;

		}
		get min() {

			return this.obj[ this.minProp ];

		}
		set min( v ) {

			this.obj[ this.minProp ] = v;
			this.obj[ this.maxProp ] = Math.max( this.obj[ this.maxProp ], v + this.minDif );

		}
		get max() {

			return this.obj[ this.maxProp ];

		}
		set max( v ) {

			this.obj[ this.maxProp ] = v;
			this.min = this.min; // this will call the min setter

		}

	}

	function updateCamera() {

		camera.updateProjectionMatrix();

	}

	const gui = new GUI();
	gui.add( camera, 'fov', 1, 180 ).onChange( updateCamera );
	const minMaxGUIHelper = new MinMaxGUIHelper( camera, 'near', 'far', 0.1 );
	gui.add( minMaxGUIHelper, 'min', 0.1, 50, 0.1 ).name( 'near' ).onChange( updateCamera );
	gui.add( minMaxGUIHelper, 'max', 0.1, 50, 0.1 ).name( 'far' ).onChange( updateCamera );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();
	const scene = new THREE.Scene();

	{
		const loader = new THREE.TextureLoader();
		const texture = loader.load(
			'Objects/secluded_beach.jpg',
			() => {

				texture.mapping = THREE.EquirectangularReflectionMapping;
				texture.colorSpace = THREE.SRGBColorSpace;
				scene.background = texture;

			} );

	}
	
	//scene objects
	{
		// //cube with textures
		// {
		// 	const cubeSize = 4;
		// 	const cubeGeo = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
		// 	const loader = new THREE.TextureLoader();
		// 	const texture = loader.load('Objects/jason-leung-UMncYEfO9-U-unsplash.jpg');
		// 	texture.colorSpace = THREE.SRGBColorSpace;
		// 	const cubeMat = new THREE.MeshBasicMaterial( { map: texture } );
		// 	const mesh = new THREE.Mesh( cubeGeo, cubeMat );
		// 	mesh.position.set( cubeSize + 1, cubeSize / 2, 0 );
		// 	scene.add( mesh );

		// }

		//basic sphere
		// {
		// 	const sphereRadius = 3;
		// 	const sphereWidthDivisions = 32;
		// 	const sphereHeightDivisions = 16;
		// 	const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
		// 	const sphereMat = new THREE.MeshPhongMaterial( { color: '#CA8' } );
		// 	const mesh = new THREE.Mesh( sphereGeo, sphereMat );
		// 	mesh.position.set( - sphereRadius - 1, sphereRadius + 2, 0 );
		// 	scene.add( mesh );

		// }
		
		// //pineapple, texture mtl file isnt working? could be too complex? just shows up as black
		// {
		// 	const mtlLoader = new MTLLoader();
		// 	mtlLoader.load('Objects/10200_Pineapple_v1-L2.mtl', (mtl) =>{
		// 		mtl.preload();
			
		// 		const objLoader = new OBJLoader();
		// 		objLoader.setMaterials(mtl);

		// 		objLoader.load('Objects/10200_Pineapple_v1-L2.obj', (root) => {
		// 			root.scale.x = .25;
		// 			root.scale.y = .25;
		// 			root.scale.z = .25;
		// 			root.position.set(10,0,0);
		// 			root.rotateX(Math.PI / 180 * -90);
		// 			scene.add(root);
		// 		});
		// 	});
		// }

		//cowboy hat on alien on surfboard
		{
			const objLoader = new OBJLoader();
			objLoader.load('Objects/Cowboy_Hat.obj', (root) =>{
				root.scale.x = .15;
				root.scale.y = .15;
				root.scale.z = .15;
				root.position.set(-10,5,-11);
				root.rotateX(Math.PI / 180 * -90);
				scene.add(root);
			});
		}

		// //Dodecahedron 
		// {
		// 	const radius = 2.5;
		// 	const geo = new THREE.DodecahedronGeometry(radius);
		// 	const mat = new THREE.MeshPhongMaterial( { color: '#D4AC0D' } );
		// 	const mesh = new THREE.Mesh( geo, mat );
		// 	mesh.position.set(5,10,-5);
		// 	scene.add(mesh);
		// }

		// //Icosahedron with texture
		// {
		// 	const radius = 3;
		// 	const geo = new THREE.IcosahedronGeometry(radius);
		// 	const loader = new THREE.TextureLoader();
		// 	const texture = loader.load('Objects/abyan-athif-K0U0eSAjFGU-unsplash.jpg');
		// 	texture.colorSpace = THREE.SRGBColorSpace;
		// 	const mat = new THREE.MeshBasicMaterial( { map: texture } );
		// 	const mesh = new THREE.Mesh(geo, mat);
		// 	mesh.position.set(-5,10,5);
		// 	scene.add(mesh);
		// }

		// //deadtree
		// {
		// 	const mtlLoader = new MTLLoader();
		// 	mtlLoader.load('Objects/DeadTree.mtl', (mtl) =>{
		// 		mtl.preload();
			
		// 		const objLoader = new OBJLoader();
		// 		objLoader.setMaterials(mtl);

		// 		objLoader.load('Objects/DeadTree.obj', (root) => {
		// 			root.scale.x = .75;
		// 			root.scale.y = .75;
		// 			root.scale.z = .75;
		// 			root.position.set(0,0,10);
		// 			scene.add(root);
		// 		});
		// 	});
		// }

		//SURFBOARD
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/10537_Surfboard_v1_L3.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/10537_Surfboard_v1_L3.obj', (root) => {
					root.scale.x = .15;
					root.scale.y = .15;
					root.scale.z = .15;
					root.position.set(-10,-10,-10);
					root.rotateX(Math.PI / 180 * -90);
					scene.add(root);
				});
			});
		}

		//alien on surfboard
		{	
			const objLoader = new OBJLoader();
			objLoader.load('Objects/alien_11.obj', (root) => {
				root.scale.x = 1.5;
				root.scale.y = 1.5;
				root.scale.z = 1.5;
				root.position.set(-10,5,-11);
				root.rotateX(Math.PI / 180 * -225);

				scene.add(root);
			});
		}	

		//icecream cone
		{
			const geo = new THREE.ConeGeometry(2.5, 5, 16);
			const mat = new THREE.MeshPhongMaterial( { color: '#CAB14C' } );
			const mesh = new THREE.Mesh(geo, mat);
			mesh.rotateX(Math.PI / 180 * 180);
			mesh.position.set(-15, 0, 0);
			scene.add(mesh);
		}

		//sphere for ice cream
		{
			const sphereRadius = 2.5;
			const sphereWidthDivisions = 32;
			const sphereHeightDivisions = 16;
			const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
			const sphereMat = new THREE.MeshPhongMaterial( { color: '#FFFFFF' } );
			const mesh = new THREE.Mesh( sphereGeo, sphereMat );
			mesh.position.set(-15, 4, 0);
			scene.add( mesh );

		}

		//2nd sphere for ice cream
		{
			const sphereRadius = 2.5;
			const sphereWidthDivisions = 32;
			const sphereHeightDivisions = 16;
			const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
			const sphereMat = new THREE.MeshPhongMaterial( { color: '#CE7272' } );
			const mesh = new THREE.Mesh( sphereGeo, sphereMat );
			mesh.position.set(-15, 6.5, 0);
			scene.add( mesh );

		}

		//3rd sphere for ice cream
		{
			const sphereRadius = 2.5;
			const sphereWidthDivisions = 32;
			const sphereHeightDivisions = 16;
			const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
			const sphereMat = new THREE.MeshPhongMaterial( { color: '#582020' } );
			const mesh = new THREE.Mesh( sphereGeo, sphereMat );
			mesh.position.set(-15, 8.5, 0);
			scene.add( mesh );

		}
		
		//heart shape from Three.js primitives
		{
			const shape = new THREE.Shape();
			const x = -2.5;
			const y = -5;
			shape.moveTo(x + 2.5, y + 2.5);
			shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
			shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
			shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
			shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
			shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
			shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

			const extrudeSettings = {
				steps : 1,
				depth : 2,
				bevelEnabled : true,
				bevelThickness : 1,
				bevelSize : 1,
				bevelSegments : 2,
			};

			const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
			const mat = new THREE.MeshPhongMaterial( { color: '#F11414' } );
			const mesh = new THREE.Mesh( geo, mat );
			mesh.position.set(-7, 8, 5);
			mesh.rotateX(Math.PI / 180 * 180);
			scene.add( mesh );
		}

		//Skateboard
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/11703_skateboard_v1_L3.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/11703_skateboard_v1_L3.obj', (root) => {
					root.scale.x = .15;
					root.scale.y = .15;
					root.scale.z = .15;
					root.position.set(12,-9,-10);
					root.rotateX(Math.PI / 180 * -90);
					root.rotateZ(Math.PI / 180 * -90);

					scene.add(root);
				});
			});
		}

		//alien on skateboard
		{	
			const objLoader = new OBJLoader();
			objLoader.load('Objects/alien_11.obj', (root) => {
				root.scale.x = 1.5;
				root.scale.y = 1.5;
				root.scale.z = 1.5;
				root.position.set(12,5,-12);
				root.rotateX(Math.PI / 180 * -225);
				scene.add(root);
			});
		}	

		//party hat for alien 
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/12179_Hat_v1_l2.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/12179_Hat_v1_l2.obj', (root) => {
					// root.scale.x = .15;
					// root.scale.y = .15;
					// root.scale.z = .15;
					root.position.set(12,9,-12);
					root.rotateX(Math.PI / 180 * -90);
					// root.rotateZ(Math.PI / 180 * -90);

					scene.add(root);
				});
			});
		}

		// //torus knot
		// {
		// 	const geo = new THREE.TorusKnotGeometry(3.5, 1.5, 8, 64, 2, 3);
		// 	const mat = new THREE.MeshPhongMaterial( { color: '#229954' } );
		// 	const mesh = new THREE.Mesh(geo, mat);
		// 	mesh.position.set(19, -8.5, 2);
		// 	scene.add(mesh);
		// }

		//palm tree 1
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/10446_Palm_Tree_v1_max2010_iteration-2.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/10446_Palm_Tree_v1_max2010_iteration-2.obj', (root) => {
					root.scale.x = .04;
					root.scale.y = .04;
					root.scale.z = .04;
					root.position.set(19,-8,-12);
					root.rotateX(Math.PI / 180 * -90);

					scene.add(root);
				});
			});
		}

		//palm tree 2
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/10446_Palm_Tree_v1_max2010_iteration-2.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/10446_Palm_Tree_v1_max2010_iteration-2.obj', (root) => {
					root.scale.x = .04;
					root.scale.y = .04;
					root.scale.z = .04;
					root.position.set(-27,-8,-12);
					root.rotateX(Math.PI / 180 * -90);

					scene.add(root);
				});
			});
		}

		// Beach by Poly by Google [CC-BY] via Poly Pizza
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/Beach_1250.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/Beach_1250.obj', (root) => {
					root.scale.x = .65;
					root.scale.y = .65;
					root.scale.z = .65;
					root.position.set(-15,-15,-12);
					root.rotateY(Math.PI / 180 * 90);

					scene.add(root);
				});
			});
		}
		//first crab
		// Crab by Poly by Google [CC-BY] via Poly Pizza
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/NOVELO_CRAB.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/NOVELO_CRAB.obj', (root) => {
					root.scale.x = .005;
					root.scale.y = .005;
					root.scale.z = .005;
					root.position.set(3,-6.5,-5);
					// root.rotateY(Math.PI / 180 * 90);

					scene.add(root);
				});
			});
		}

		//second crab
		// Crab by Poly by Google [CC-BY] via Poly Pizza
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/NOVELO_CRAB.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/NOVELO_CRAB.obj', (root) => {
					root.scale.x = .005;
					root.scale.y = .005;
					root.scale.z = .005;
					root.position.set(8,-6.25,-4.75);
					root.rotateY(Math.PI / 180 * -15);

					scene.add(root);
				});
			});
		}

		// Red/White Beach Umbrella by S. Paul Michael [CC-BY] via Poly Pizza
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/materials.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/model.obj', (root) => {
					root.scale.x = 25;
					root.scale.y = 25;
					root.scale.z = 25;
					root.position.set(7,2.5,5);

					scene.add(root);
				});
			});
		}

		// Sand castle by Poly by Google [CC-BY] via Poly Pizza
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/SM_SandCastle_02.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/SM_SandCastle_02.obj', (root) => {
					root.scale.x = 5;
					root.scale.y = 5;
					root.scale.z = 5;
					root.position.set(2,-4.25,5);
					root.rotateY(Math.PI / 180 * 90);
					root.rotateZ(Math.PI / 180 * -8);

					scene.add(root);
				});
			});
		}

		// Blowfish by jeremy [CC-BY] via Poly Pizza
		{
			const mtlLoader = new MTLLoader();
			mtlLoader.load('Objects/Blowfish_01.mtl', (mtl) =>{
				mtl.preload();
			
				const objLoader = new OBJLoader();
				objLoader.setMaterials(mtl);

				objLoader.load('Objects/Blowfish_01.obj', (root) => {
					root.scale.x = 50;
					root.scale.y = 50;
					root.scale.z = 50;
					root.position.set(2,0,0);
					// root.rotateY(Math.PI / 180 * 90);
					// root.rotateZ(Math.PI / 180 * -8);

					scene.add(root);
				});
			});
		}
	}

	// directional light
	{
		const color = 0xFFFFFF;
		const intensity = 1.5;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 0, 10, 0 );
		light.target.position.set( - 5, 0, 0 );
		scene.add( light );
		scene.add( light.target );

	}

	// ambient light
	{
		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.AmbientLight(color, intensity);
		scene.add(light);
	}

	// sky light
	{	
		const skyColor = 0xB1E1FF; // light blue
		const groundColor = 0xff0059; //red
		const intensity = 2;
		const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
		scene.add(light);
	}


	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render() {

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();


