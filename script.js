import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' 
import { metalness } from 'three/webgpu';
import gsap from 'gsap';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

skyBox.name = "skyBox";

skyBox.ignoreRaycast = true;

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

//Warning about MeshStandardMaterial in the web console. Weird.
const planeBoxGeometry = new THREE.BoxGeometry(2000,2000,3);
const planeBoxMaterial = new THREE.MeshStandardMaterial({
    aOMap: aO,
    map: col,
    displacementMap: height,
    normalMap: normal,
    roughnessMap: rough
});
const plane = new THREE.Mesh(planeBoxGeometry, planeBoxMaterial);

plane.position.set(0,0,0);

plane.rotation.x += Math.PI/2;

plane.name = "plane";

plane.ignoreRaycast = true;

scene.add(plane);

const spotLight = new THREE.DirectionalLight(0xffffff,5);
spotLight.target = plane;
spotLight.position.y += 1000;
scene.add(spotLight);

const spotHelp = new THREE.DirectionalLightHelper(spotLight);
scene.add(spotHelp);

//Warning about MeshStandardMaterial in the web console. Weird.
const cubeGeometry = new THREE.BoxGeometry(20,20,20);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff51cf,
    roughnes: 0,
    metalness: 0.8,
    fog:1
})

const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.position.y = 20;
cube.position.x = 0;
cube.position.z = 0;

gsap.to(cube.rotation, { duration: 3, y: Math.PI * 2, z: Math.PI*2, ease: "linear", repeat: -1, yoyo: false });
cube.name = "cube";

scene.add(cube);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cameraPers, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 100;
controls.maxDistance = 6000;


const loader = new GLTFLoader(); 

loader.load( 'textures/q2hNA4Kv/gaming_console_4k.gltf', function ( gltf ) 
{
    const gameConsole = gltf.scene; 
    gameConsole.position.set(600,20,0);
    gameConsole.scale.set(70,70,70);
    gameConsole.isGLTF = true;
    scene.add( gameConsole );
    console.log(gameConsole);
}, undefined, function ( error ) { console.error( error ); } );

//Raycasting function
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const SelectObject = (event) => 
{
    event.preventDefault();

    //Numbers given are for accuracy of the raycast (may need to adjust these values based on aspect ratio or other variables rather than these values).
    pointer.x = (event.clientX / window.innerWidth)*2 - 1.008;
    pointer.y = -(event.clientY / window.innerHeight)*2 + 1.0178;

    console.log("x: " +pointer.x + " y: " + pointer.y);

    raycaster.setFromCamera(pointer,cameraPers);

    //Fixed don't need this anymore.
    const arrowHelper = new THREE.ArrowHelper(raycaster.ray.direction,cameraPers.position, 70, 0x00ffff);
    scene.add(arrowHelper);
    
    const intersects = raycaster.intersectObjects(scene.children, true);
    const filteredintersects = intersects.filter(intersect => !intersect.object.ignoreRaycast);

    console.log(filteredintersects);

    if(filteredintersects.length > 0)
    {
        if(filteredintersects[0].object.parent.isGLTF)
        {
            const target = filteredintersects[0].object.parent;
            console.log(target.name);
            controls.target = target.position;
            controls.update(); 
        }
        else
        {
            const target = filteredintersects[0].object;
            console.log(target.name);
            controls.target = target.position;
            controls.update(); 
        }
            
        
    }
}
window.addEventListener('click', SelectObject);

controls.target = cube.position;

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,cameraPers);
    
}

animate();

