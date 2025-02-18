import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' 
import { metalness, TetrahedronGeometry } from 'three/webgpu';
import gsap from 'gsap';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/Addons.js';

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
spotLight.castShadow = true;
scene.add(spotLight);

// const spotHelp = new THREE.DirectionalLightHelper(spotLight);
// scene.add(spotHelp);

//Warning about MeshStandardMaterial in the web console. Weird.
//Platonic Solids
const cubeGeometry = new THREE.BoxGeometry(20,20,20);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x4d9900,
    roughnes: 0,
    metalness: 0.8,
    fog:1
});

const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.position.y = 20;
cube.position.x = -100;
cube.position.z = 100;

gsap.to(cube.rotation, { duration: 10, y: Math.PI * 2, z: Math.PI*2, ease: "linear", repeat: -1, yoyo: false });
cube.name = "cube";

scene.add(cube);

const tetrahedGeometry = new THREE.TetrahedronGeometry(20);
const tetrahedMaterial = new THREE.MeshStandardMaterial({
    color: 0x9b0000,
    roughnes: 0,
    metalness: 0.8,
    fog:1
});

const tetrahedron = new THREE.Mesh(tetrahedGeometry, tetrahedMaterial);
tetrahedron.position.y = 20 ;
tetrahedron.position.x = 100;
tetrahedron.position.z = 100;

gsap.to(tetrahedron.rotation, { duration: 10, y: Math.PI * 2, z: Math.PI*2, ease: "linear", repeat: -1, yoyo: false });

scene.add(tetrahedron);

const octahedGeometry = new THREE.OctahedronGeometry(20);
const octahedMaterial = new THREE.MeshStandardMaterial({
    color: 0x9c9c9c,
    roughnes: 0,
    metalness: 0.8,
    fog:1
});

const octahedron = new THREE.Mesh(octahedGeometry, octahedMaterial);

octahedron.position.y = 20;
octahedron.position.x = 100;
octahedron.position.z = -100;

gsap.to(octahedron.rotation, { duration: 10, y: Math.PI * 2, z: Math.PI*2, ease: "linear", repeat: -1, yoyo: false });

scene.add(octahedron);


const dodecGeometry = new THREE.DodecahedronGeometry(20);
const dodecMaterial = new THREE.MeshStandardMaterial({
    color: 0x00a4f2,
    roughnes: 0,
    metalness: 0.8,
    fog:1
});

const dodecahedron = new THREE.Mesh(dodecGeometry, dodecMaterial);

dodecahedron.position.y = 20;
dodecahedron.position.x = -100;
dodecahedron.position.z = -100;

gsap.to(dodecahedron.rotation, { duration: 10, y: Math.PI * 2, z: Math.PI*2, ease: "linear", repeat: -1, yoyo: false });

scene.add(dodecahedron);

//icosahedron

const icosaGeometry = new THREE.IcosahedronGeometry(20);
const icosaMaterial = new THREE.MeshStandardMaterial({
    color: 0xfbfb00,
    roughnes: 0,
    metalness: 0.8,
    fog:1
});

const icosahedron = new THREE.Mesh(icosaGeometry, icosaMaterial);

icosahedron.position.y = 50;
icosahedron.position.x = 0;
icosahedron.position.z = 0;

icosahedron.receiveShadow = true;

gsap.to(icosahedron.rotation, { duration: 10, y: Math.PI * 2, z: Math.PI*2, ease: "linear", repeat: -1, yoyo: false });

scene.add(icosahedron);
//----------------------------------------------

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cameraPers, renderer.domElement);
controls.enableDamping = false;
controls.minDistance = 100;
controls.maxDistance = 6000;

//Gaming console
const loader = new GLTFLoader(); 

loader.load( '3d_models/q2hNA4Kv/gaming_console_4k.gltf', function ( gltf ) 
{
    const gameConsole = gltf.scene; 
    gameConsole.position.set(600,20,0);
    gameConsole.scale.set(70,70,70);
    gameConsole.isParent = true;
    scene.add( gameConsole );
    console.log(gameConsole);
}, undefined, function ( error ) { console.error( error ); } );

//World object
const worldLoader = new GLTFLoader();

worldLoader.load('3d_models/Earth.glb', function(gltf){
    const earth = gltf.scene; 
    earth.position.set(0,200,0);
    earth.scale.set(50,50,50);
    earth.isEarth = true;
    earth.name = "earth";
    gltf.scene.traverse( function( node )  {
    if ( node.isMesh ) { node.castShadow = true; }});
    gsap.to(earth.rotation, { duration: 10, y: Math.PI * 2, ease: "power1.inOut", repeat: -1, yoyo: true });
    scene.add( earth );
    console.log(earth);
    
}, undefined, function (error) {console.error(error);});

const carLoader = new FBXLoader();
carLoader.load('3d_models/Car FBX.fbx',
    (car) => {
        car.name = "CrazyCar";
        car.position.set(-600,20,0);
        car.scale.set(0.5,0.5,0.5);
        const plane = car.getObjectByName("Plane");
        car.remove(plane);
        car.traverse(function(node) {
            node.isCrazyCar = true;
        })
        scene.add(car);
        console.log(car);
    }
);

const maleDancer = new FBXLoader();
var mixer = new THREE.AnimationMixer();

maleDancer.load('animations/Hip Hop Dancing_male.fbx',
    (RoboX) => {
        RoboX.name = "dude";
        RoboX.position.set(-50,20,600);
        RoboX.scale.set(0.5,0.5,0.5);
        RoboX.traverse(function(node){
            node.isFBXguy = true;
        })
        scene.add(RoboX);
        console.log(RoboX);
        mixer = new THREE.AnimationMixer(RoboX);
        console.log(RoboX.animations)
        const animation = mixer.clipAction(RoboX.animations[0]);
        animation.play();
    }
);

const femaleDancer = new FBXLoader();
var mixer1 = new THREE.AnimationMixer();

femaleDancer.load('animations/Hip Hop Dancing_female.fbx',
    (RoboY) => {
        RoboY.name="gal";
        RoboY.position.set(50,20,600);
        RoboY.scale.set(0.5,0.5,0.5);
        RoboY.traverse(function(node){
            node.isFBXgal = true;
        })
        scene.add(RoboY);
        console.log(RoboY);
        mixer1 = new THREE.AnimationMixer(RoboY);
        console.log(RoboY.animations);
        const animation1 = mixer1.clipAction(RoboY.animations[0]);
        animation1.play();
        console.log(mixer1);
    }
);

//for enabling shadows

renderer.shadowMap.enabled = true;


const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

//Raycasting function

const SelectObject = (event) => 
{
    // event.preventDefault();

    pointer.x = (event.clientX / window.innerWidth)*2 - 1;
    pointer.y = -(event.clientY / window.innerHeight)*2 + 1;

    console.log("x: " +pointer.x + " y: " + pointer.y);

    raycaster.setFromCamera(pointer,cameraPers);

    //Fixed don't need this anymore.
    // const arrowHelper = new THREE.ArrowHelper(raycaster.ray.direction,cameraPers.position, 70, 0x00ffff);
    // scene.add(arrowHelper);
    
    const intersects = raycaster.intersectObjects(scene.children, true);
    const filteredintersects = intersects.filter(intersect => !intersect.object.ignoreRaycast);

    console.log(filteredintersects);

    if(filteredintersects.length > 0)
    {
        if(filteredintersects[0].object.parent.isParent)
        {
            const target = filteredintersects[0].object.parent;
            console.log(target.name);
            controls.target = target.position;
            controls.update(); 
        }
        //To select earth planet properly.
        //In the condition are names of the meshes of the mesh (called "group1519172617")
        else if(filteredintersects[0].object.name == "mesh1519172617" || filteredintersects[0].object.name == "mesh1519172617_1")
        {
            const target = filteredintersects[0].object.parent.parent;
            console.log(target.name);
            controls.target = target.position;
            controls.update(); 
        }
        else if(filteredintersects[0].object.isCrazyCar)
        {
            const target = scene.getObjectByName("CrazyCar");
            console.log(target.name);
            controls.target = target.position;
            controls.update();
        }
        else if(filteredintersects[0].object.isFBXgal)
        {
            const target = scene.getObjectByName("gal");
            console.log(target.name);
            controls.target = target.position;
            controls.update();
        }
        else if(filteredintersects[0].object.isFBXguy)
        {
            const target = scene.getObjectByName("dude");
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

//add new calculations when window is resized for raycast.

window.addEventListener('resize', function(event) {
    renderer.setSize(this.window.innerWidth,this.window.innerHeight);
    cameraPers.aspect = this.window.innerWidth/this.window.innerHeight;
    cameraPers.updateProjectionMatrix();
});

controls.target = cube.position;

const clock = new THREE.Clock();

const canvas = renderer.domElement;
const widthHalf = canvas.width/2;
const heightHalf = canvas.height/2;
//car textbox
const carTextBox = document.getElementById("car");
var carBoxPosition = new THREE.Vector3();

const car = scene.getObjectByName("CrazyCar");

function animate(){
    if(controls.target) {
        carBoxPosition.setFromMatrixPosition(car.matrix);
        carBoxPosition.project(cameraPers);
        let rect = canvas.getBoundingClientRect();
        carBoxPosition.x = rect.left + (carBoxPosition.x*widthHalf) + widthHalf;
        carBoxPosition.y = rect.top - (carBoxPosition.y*heightHalf) + heightHalf;
        carTextBox.style.top=`${carBoxPosition.y}px`;
        carTextBox.style.left=`${carBoxPosition.x}px`;
        carTextBox.style.visibility = `visible`;
    }
    // console.log(controls.target.name);
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();
    //maledancer && femaledancer update
    if (mixer && mixer1) {
        mixer.update(deltaTime);
        mixer1.update(deltaTime);
    }
    renderer.render(scene,cameraPers);
    
}
animate();


console.log(car);
