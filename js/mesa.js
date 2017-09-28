
var camera, scene, renderer, material ,top_right_rot, center_rot, rot_lar;

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
  material = new THREE.MeshBasicMaterial({color: 0x666666, wireframe:true});

  addTableTop(table, 0, 0, 0);

  scene.add(table);
  table.position.x = x;
  table.position.y = y;
  table.position.z = z;
}

function addFolhaLaranja(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(0.3,1, 1.5);
  //var mesh = new THREE.Mesh(geometry, material);
  material = new THREE.MeshBasicMaterial( {color: 0x009900, wireframe: false} );
  var folha = new THREE.Mesh( geometry, material );
  folha.position.set(x,y,z + 0.90);

  obj.add(folha);
}

function addPeLaranja(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(0.3, 3, 0.3);
  //var mesh = new THREE.Mesh(geometry, material);
  material = new THREE.MeshBasicMaterial( {color: 0x331900, wireframe: false} );
  var pe = new THREE.Mesh( geometry, material );
  pe.position.set(x,y + 6.5,z);

  addFolhaLaranja(pe, 0,0,0);

  obj.add(pe);
}

function createLaranja(x,y,z){
  'use strict';
  var geometry = new THREE.SphereGeometry( 5, 16, 16 );
  material = new THREE.MeshBasicMaterial( {color: 0xFF6E0E, wireframe: false} );
  var laranja = new THREE.Mesh( geometry, material );
  if (rot_lar == 1){
    laranja.rotation.z = Math.PI / 2.;
    laranja.rotation.y = -2 * Math.PI / 3.;
  }
  if (rot_lar == 2){
    laranja.rotation.z = Math.PI / 3;
    laranja.rotation.y = Math.PI / 3;
  }

  addPeLaranja(laranja, 0,0,0);

  laranja.position.x = x;
  laranja.position.y = y;
  laranja.position.z = z;
  rot_lar = 0;
  scene.add( laranja );

}

function createBorder(x, y, z){
  'use strict';
  var geometry = new THREE.TorusGeometry(1, 0.3, 7, 100);
  material = new THREE.MeshBasicMaterial({color: 0xe5a734, wireframe:false});
  var torus = new THREE.Mesh(geometry, material);
  torus.position.set(x,y,z);
  torus.rotation.x = Math.PI / 2;
  scene.add(torus);

}

function createButter(x,y,z){
  'use strict';
  var geometry = new THREE.CubeGeometry(3, 2, 7);
  material = new THREE.MeshBasicMaterial({color: 0xffd633, wireframe:false});
  var butter = new THREE.Mesh(geometry, material);
  if (top_right_rot == 1){
    butter.rotation.y = Math.PI / 3;
  }
  if (center_rot == 1){
    butter.rotation.y = Math.PI / 2;
  }
  butter.position.x = x;
  butter.position.y = y;
  butter.position.z = z;
  center_rot = 0;
  top_right_rot = 0;
  scene.add(butter);

}

function createScene(){
  'use strict';
  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(10));
  var inner, outter;

  createTable(0,0,0);
  createCar(0, 0, 0);

  rot_lar = 1;
  createLaranja(6,5,-2);
  rot_lar = 2;
  createLaranja(-6,5,-6);
  createLaranja(-5,5,7);

  createButter(18, 1, 13);
  center_rot = 1;
  createButter(-10, 1, 18.5);
  createButter(-24, 1, 0);
  createButter(0, 1, -24);
  top_right_rot = 1;
  createButter(24, 1, -20);

  createBorder(-28,0.25,-26);
  createBorder(28,0.25,-26);
  createBorder(-28,0.25,26);
  createBorder(28,0.25,26);

  for (inner = -10.5; inner <= 10.5; inner += 3.5){
      createBorder(14, 0.25, inner);
      createBorder(-14, 0.25, inner);
      createBorder(inner, 0.25, 12);
      createBorder(inner, 0.25, -12);
  }
  for (outter = -24.5; outter <= 24.5; outter += 3.5){
      createBorder(outter, 0.25, 26);
      createBorder(outter, 0.25, -26);
      createBorder(31, 0.25, outter);
      createBorder(-31, 0.25, outter);
  }
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
