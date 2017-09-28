
var camera, scene, renderer, material;

var car, letter=0;

function addMainChassis(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(6, 1, 3);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  obj.add(mesh);
}

function addCockpit(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(3, 1, 3);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  obj.add(mesh);
}

function addWheel(obj, x, y, z){
  'use strict';
  var geometry = new THREE.TorusGeometry( 0.5, 0.2, 16, 50);
  var torus = new THREE.Mesh( geometry, material );
  torus.position.set(x,y,z);
  obj.add(torus);
}

function addLights(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CylinderGeometry( 0.2, 0.1, 0.1, 32 );
  var cylinder = new THREE.Mesh( geometry, material );
  cylinder.rotation.set(0,0,Math.PI/2);
  cylinder.position.set(x,y,z);
  obj.add( cylinder );
}

function addAxis(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CylinderGeometry( 0.2, 0.2, 0.2, 32 );
  var cylinder = new THREE.Mesh( geometry, material );
  cylinder.rotation.set(Math.PI/2, 0, 0);
  cylinder.position.set(x,y,z);
  obj.add( cylinder );
}

function createCar(x, y, z){
  'use strict';
  car = new THREE.Object3D();
  car.userData = {velX: 0, velY: 0, acelX: 0, acelY: 0, step: 0, lastStep: 0};

  material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true});

  addMainChassis(car, 0, 1, 0);
  addCockpit(car, -0.6, 2, 0);
  addWheel(car, 2, 0.5, 1.6);
  addWheel(car, 2, 0.5, -1.6);
  addWheel(car, -2, 0.5, 1.6);
  addWheel(car, -2, 0.5, -1.6);
  addLights(car, 3, 1, 1.2);
  addLights(car, 3, 1, -1.2);
  addAxis(car, 2, 0.5, 1.5);
  addAxis(car, 2, 0.5, -1.5);
  addAxis(car, -2, 0.5, 1.5);
  addAxis(car, -2, 0.5, -1.5);

  scene.add(car);
  car.position.x = x;
  car.position.y = y;
  car.position.z = z;
}

function addTableTop(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(70, 0, 60);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  obj.add(mesh);
}


function createTable(x, y, z){
  'use strict';
  var table = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true});

  addTableTop(table, 0, 0, 0);

  scene.add(table);
  table.position.x = x;
  table.position.y = y;
  table.position.z = z;
}

function createBorder(x, y, z){
  'use strict';
  var geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  var mesh = new THREE.Mesh(geometry, material);

}

function createScene(){
  'use strict';
  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(10));
  createTable(0,0,0);
  createBorder(0,0,30);
  createCar(0, 0, 0);
}

function createCamera(){
  'use strict';
  camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
  camera.position.x = 0;
  camera.position.y = 50;
  camera.position.z = 0;
  camera.lookAt(scene.position);

}

function onResize(){
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (window.innerHeight > 0 && window.innerWidth > 0){
    camera.aspect = renderer.getSize().width / renderer.getSize().height;
    camera.updateProjectionMatrix();
  }
  render();
}

function render(){
  'use strict';
  renderer.render(scene, camera);
}

function init(){
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createScene();
  createCamera();

  render();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}

function animate() {
  'use strict';
  car.userData.step += 0.04;
  switch (letter) {
    case 87:
      car.userData.velX += 0.01;
      break;
    case 65:
      car.userData.velY -= 0.01;
      break;
    case 68:
      car.userData.velY += 0.01;
      break;
    case 83:
      car.userData.velX -= 0.005;
      break;
    default:
      car.userData.velX *= 0.8;
      car.userData.velY *= 0.8;
  }
  //letter = 0;
  if(car.userData.velX > 0.8)
    car.userData.velX = 0.8;
  if(car.userData.velY > 0.8)
    car.userData.velY = 0.8;
  if(car.userData.velX < -0.3)
    car.userData.velX = -0.3;
  if(car.userData.velY < -0.8)
    car.userData.velY = -0.8;
  car.position.x += car.userData.velX;
  car.position.z += car.userData.velY;


  render();

  requestAnimationFrame(animate);

}

function onKeyDown(e) {
    'use strict';
    letter = e.keyCode;
}

function onKeyUp(e){
  'use strict';
  letter = 0;
}
