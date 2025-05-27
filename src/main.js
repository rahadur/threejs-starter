import * as THREE from "three";
import { OrbitControls } from "three/addons";
import Stats from "three/examples/jsm/libs/stats.module.js";
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { GUI } from "dat.gui";
import "./style.css";

let scene, camera, renderer, orbit;

scene = new THREE.Scene();
scene.background = new THREE.Color(0xbbbbbb);

// prettier-ignore
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
orbit.addEventListener("change", () => render());

// Stats
let state = new Stats();
document.body.appendChild(state.domElement);

// GUI
const gui = new GUI();

// Your Coding Start

{
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  const boxGui = gui.addFolder("Box");
  boxGui.add(box.position, "x", -5, 5, 0.1).name("Position X").onChange(() => render());
  boxGui.add(box.position, "y", -5, 5, 0.1).name("Position Y").onChange(() => render());    
  boxGui.add(box.position, "z", -5, 5, 0.1).name("Position Z").onChange(() => render());
  //boxGui.onChange(() => render()); // lil-gui does this
  boxGui.open();
}

// End

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
});

function resizeRendererToDisplaySize(renderer) {
  if (!renderer?.domElement) return false;
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {

  if (resizeRendererToDisplaySize()) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  state.begin();
  renderer.render(scene, camera);
  state.end();

}

render();

/* function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate(); */
