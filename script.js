import * as THREE from 'three'

const scene = new THREE.Scene();

const cameraPers = new THREE.PerspectiveCamera(45, 4/3);

const skyBoxGeometry = new THREE.BoxGeometry(5,5);
const skyBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
});
const skyBox = new THREE.Mesh(skyBoxGeometry,skyBoxMaterial);

const renderer = new THREE.WebGLRenderer();
document.getElementById("scene").appendChild(renderer.domElement);

renderer.render(scene,cameraPers);
