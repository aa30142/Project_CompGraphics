import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' 
import { metalness } from 'three/webgpu';
import gsap from 'gsap'

const scene = new THREE.Scene();

const cameraPers = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,45,150000);

const textureLoader = new THREE.TextureLoader();

const materialarray = [];

let txBack = textureLoader.load("textures/Daylight Box_Pieces/Daylight Box_Back.png");
let txBottom = textureLoader.load("textures/Daylight Box_Pieces/Daylight Box_Bottom.png");
let txFront = textureLoader.load("textures/Daylight Box_Pieces/Daylight Box_Front.png");
let txLeft = textureLoader.load("textures/Daylight Box_Pieces/Daylight Box_Left.png");
let txRight = textureLoader.load("textures/Daylight Box_Pieces/Daylight Box_Right.png");
let txTop = textureLoader.load("textures/Daylight Box_Pieces/Daylight Box_Top.png");

materialarray.push(new THREE.MeshBasicMaterial({map:txBack,side:THREE.BackSide}));
materialarray.push(new THREE.MeshBasicMaterial({map:txFront,side:THREE.BackSide}));
materialarray.push(new THREE.MeshBasicMaterial({map:txTop,side:THREE.BackSide}));
materialarray.push(new THREE.MeshBasicMaterial({map:txBottom,side:THREE.BackSide}));
materialarray.push(new THREE.MeshBasicMaterial({map:txRight,side:THREE.BackSide}));
materialarray.push(new THREE.MeshBasicMaterial({map:txLeft,side:THREE.BackSide}));





const skyBoxGeometry = new THREE.BoxGeometry(100000,100000,100000);

// const skyBoxMaterial = new THREE.MeshBasicMaterial({
//     map: texture,
//     side: THREE.BackSide
// });
const skyBox = new THREE.Mesh(skyBoxGeometry,materialarray);

scene.add(skyBox);

cameraPers.position.z = 10;
cameraPers.position.x = 3;

scene.add(cameraPers);


//plane

const aO = textureLoader.load("textures/Tiles_053_SD/Tiles_053_ambientOcclusion.png");
const col = textureLoader.load("textures/Tiles_053_SD/Tiles_053_basecolor.png");
const height = textureLoader.load("textures/Tiles_053_SD/Tiles_053_height.png");
const normal = textureLoader.load("textures/Tiles_053_SD/Tiles_053_normal.png");
const rough = textureLoader.load("textures/Tiles_053_SD/Tiles_053_roughness.png"); 

const planeBoxGeometry = new THREE.BoxGeometry(10000,10000,1);
const planeBoxMaterial = new THREE.MeshStandardMaterial({
    aOMap: aO,
    map: col,
    displacementMap: height,
    normalMap: normal,
    roughnessMap: rough
});
const plane = new THREE.Mesh(planeBoxGeometry, planeBoxMaterial);

plane.rotation.x += Math.PI/2;

scene.add(plane);

const spotLight = new THREE.DirectionalLight(0xffffff,5);
spotLight.target = plane;
spotLight.position.y += 1000;
scene.add(spotLight);

const spotHelp = new THREE.DirectionalLightHelper(spotLight);
scene.add(spotHelp);

const cubeGeometry = new THREE.BoxGeometry(200,200,200);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff51cf,
    roughnes: 0,
    metalness: 0.387,
    fog:1
})

const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.position.y += 200;
cube.position.x = 3000;

gsap.to(cube.rotation, { duration: 3, y: Math.PI * 2, z: Math.PI*2, ease: "linear", repeat: -1, yoyo: false });

scene.add(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cameraPers, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 500;
controls.maxDistance = 3000;

controls.target = cube.position;

function animate(){
    renderer.render(scene,cameraPers);
    controls.update();
    requestAnimationFrame(animate);
}

animate();

