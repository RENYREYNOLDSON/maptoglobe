import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffbdbd );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth*0.75 / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth*0.75, window.innerHeight );
document.getElementById("container").appendChild( renderer.domElement );
// Enabling shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; 

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();


const ambient_light = new THREE.AmbientLight( 0x404040,20 ); // soft white light
scene.add( ambient_light );

const light = new THREE.PointLight( 0xfffee0, 500, 100 );
light.position.set( 5,5,5);
camera.add( light );

scene.add(camera);

//Define the image here!!
const texture = new THREE.TextureLoader().load( "./pattern.jpg" );

const geometry = new THREE.SphereGeometry( 2,64,32);
const material = new THREE.MeshPhongMaterial( {map:texture} );
const cube = new THREE.Mesh( geometry, material );
cube.receiveShadow=true;
scene.add( cube );

cube.rotation.x=-0.075;

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );


	renderer.render( scene, camera );
}

//3D OBJECT IMPORTING
function drawBuilding() {
	// High Detail
	loader.load( './models/globe.glb', function ( glb ) {
		glb.scene.traverse( function( node ) {
			if ( node.isMesh ) { 
				node.castShadow = true;
				node.receiveShadow=true;}
		} );
        glb.scene.scale.set(10.5,10.5,10.5)
		glb.scene.position.x=0;
        glb.scene.position.y=-1;
        glb.scene.position.z=-0.4;
        scene.add(glb.scene);
	});
};







drawBuilding();
animate();

//Add options and upload
//Add options for lighting
//Add options for plain or in environment