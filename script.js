import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' 

const scene = new THREE.Scene();

const cameraPers = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,45,30000);

const skyBoxGeometry = new THREE.BoxGeometry(10000,10000,10000);
const skyBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
});
const skyBox = new THREE.Mesh(skyBoxGeometry,skyBoxMaterial);

scene.add(skyBox);

cameraPers.position.z = 10;
cameraPers.position.x = 3;

scene.add(cameraPers);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cameraPers, renderer.domElement);
controls.enableDamping = true;
controls.target = skyBox.position;

function animate(){
    renderer.render(scene,cameraPers);
    controls.update();
    requestAnimationFrame(animate);
}

animate();

