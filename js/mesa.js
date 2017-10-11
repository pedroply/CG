
var camera, scene, renderer, material;

var car, gas = false, left = false, right = false, back = false, cameraViewCar = false;

var clock = new THREE.Clock;

function addMainChassis(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(6, 1, 3);
  material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:false});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  obj.add(mesh);
}

function addCockpit(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(3, 1, 3);
  material = new THREE.MeshBasicMaterial({color: 0xff5520, wireframe:false});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  obj.add(mesh);
}

function addWheel(obj, x, y, z){
  'use strict';
  var geometry = new THREE.TorusGeometry( 0.5, 0.2, 16, 50);
  material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe:false});
  var torus = new THREE.Mesh( geometry, material );
  torus.position.set(x,y,z);
  obj.add(torus);
}

function addLights(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CylinderGeometry( 0.2, 0.1, 0.1, 32 );
  material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe:false});
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
  car.userData = {velX: 0, velZ: 0, acel:0, vel: 0, step: 0, lastStep: 0};
  car.add(new THREE.AxisHelper(10));

  material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:false});

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
  var geometry = new THREE.CubeGeometry(90, 0, 80);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  obj.add(mesh);
}



function createTable(x, y, z){
  'use strict';
  var table = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({color: 0x056C24, wireframe:false});

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

function createLaranja(x,y,z,rot_z,rot_y){
  'use strict';
  var geometry = new THREE.SphereGeometry( 5, 16, 16 );
  material = new THREE.MeshBasicMaterial( {color: 0xFF6E0E, wireframe: false} );
  var laranja = new THREE.Mesh( geometry, material );
  if (rot_z != 0){
    laranja.rotation.z = Math.PI / rot_z;
  }
  if (rot_y != 0){
    laranja.rotation.y =  Math.PI / rot_y;
  }

  addPeLaranja(laranja, 0,0,0);

  laranja.position.x = x;
  laranja.position.y = y;
  laranja.position.z = z;
  scene.add( laranja );

}

function createBorder(x, y, z){
  'use strict';
  var geometry = new THREE.TorusGeometry(1, 0.3, 5, 10);
  material = new THREE.MeshBasicMaterial({color: 0xe5a734, wireframe:false});
  var torus = new THREE.Mesh(geometry, material);
  torus.position.set(x,y,z);
  torus.rotation.x = Math.PI / 2;
  scene.add(torus);

}

function createInnerBorder(num, spacing, starting){
	var inner;
	for (inner = 0; inner <= starting && num > 0; inner += spacing){
      createBorder(inner, 0.25, starting);
      createBorder(inner, 0.25, -starting);
      if (inner != 0){
	      createBorder(-inner, 0.25, starting);
	      createBorder(-inner, 0.25, -starting);
	      createBorder(-starting, 0.25, -inner);
	      createBorder(starting, 0.25, -inner);
	      num = num - 2;
	  }
	  else{
	  	num--;
	  }
	  createBorder(-starting, 0.25, inner);
      createBorder(starting, 0.25, inner);
  }
}

function createOutterBorder(num, spacing, starting){
	var outter;
	for (outter = 0; outter <= starting && num > 0; outter += spacing){
      createBorder(outter, 0.25, starting);
      createBorder(outter, 0.25, -starting);
      if (outter != 0){
	      createBorder(-outter, 0.25, starting);
	      createBorder(-outter, 0.25, -starting);
	      createBorder(-starting, 0.25, -outter);
	      createBorder(starting, 0.25, -outter);
	      num = num - 2;
	  }
	  else{
	  	num--;
	  }
	  createBorder(-starting, 0.25, outter);
      createBorder(starting, 0.25, outter);
  }
}

function createButter(x,y,z,rot){
  'use strict';
  var geometry = new THREE.CubeGeometry(3, 2, 7);
  material = new THREE.MeshBasicMaterial({color: 0xffd633, wireframe:false});
  var butter = new THREE.Mesh(geometry, material);
  if (rot != 0){
    butter.rotation.y = Math.PI / rot;
  }

  butter.position.x = x;
  butter.position.y = y;
  butter.position.z = z;
  scene.add(butter);
}

function createScene(){
  'use strict';
  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(10));
  var inner, outter;

  createTable(0,0,0);
  createCar(0, 0, 0);

  createLaranja(6,5,-2,2,3);
  createLaranja(-6,5,-6,3,-3);
  createLaranja(-5,5,7,0,0);

  createButter(18, 1, 13, 0);
  createButter(-10, 1, 18.5, 2);
  createButter(-28, 1, 0, 0);
  createButter(0, 1, -30, 0);
  createButter(27, 1, -23, 3);

  createInnerBorder(7, 3.5, 13);  //num torus, espacamento entre torus, distancia limite
  createOutterBorder(19, 3.5, 35); //num tem de ser impar, conta com o criado no 0 + o gerado acima e abaixo
}

function createCamera(){
  'use strict';
  //camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
  camera = new THREE.OrthographicCamera( 140 / - 2, 140 / 2, 81 / 2, 81 / - 2, 1, 1000 );
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
  /*renderer.setSize(window.innerWidth, window.innerHeight);
  if (window.innerHeight > 0 && window.innerWidth > 0){
  	camera.left = renderer.getSize().width/-5;
  	camera.right = renderer.getSize().width/5;
  	camera.top = renderer.getSize().height/5;
  	camera.bottom = renderer.getSize().height/-5;
  	camera.updateProjectionMatrix();
  }*/
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


  window.addEventListener('resize', onResize);

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}

function animate() {
  'use strict';
  var Vet = [10,0,0];
  var elapsedTime = clock.getDelta ();

  //console.log(car.userData.step);

  if(gas)
	car.userData.vel += 1;
  else if(back)
    car.userData.vel -= 0.5;
  else
	  car.userData.vel *= 0.9;

  if(left)
	  car.rotation.y += 5*elapsedTime;

  if(right)
	  car.rotation.y -= 5*elapsedTime;

  if(car.userData.vel>30)
	  car.userData.vel=30;
  if(car.userData.vel<-10)
	  car.userData.vel=-10;
  car.userData.velX = car.userData.vel*Math.cos(car.rotation.y);
  car.userData.velZ = -car.userData.vel*Math.sin(car.rotation.y);

  car.position.x += car.userData.velX*elapsedTime;
  car.position.z += car.userData.velZ*elapsedTime;

  if(cameraViewCar){
    camera.position.x = car.position.x-(10*Math.cos(car.rotation.y));
    camera.position.y = 10;
    camera.position.z = car.position.z+(10*Math.sin(car.rotation.y));
    camera.lookAt(car.position);
  }
  else{
    camera.position.x = 0;
    camera.position.y = 50;
    camera.position.z = 0;
    camera.lookAt(scene.position);
  }

  render();

  requestAnimationFrame( animate );
}

function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
		case 38:  //cima seta
		  gas = true;
		  break;
		case 37:  //esquerda seta
		  left = true;
		  break;
		case 39:  //direita seta
		  right = true;
		  break;
		case 40:  //baixo seta
		  back = true;
		  break;
	}
}

function onKeyUp(e){
  'use strict';
  switch (e.keyCode) {
		case 38:  //cima seta
		  gas = false;
		  break;
		case 37:  //esquerda seta
		  left = false;
		  break;
		case 39:  //direita seta
		  right = false;
		  break;
		case 40:  //baixo seta
		  back = false;
		  break;
    case 67: //c
      cameraViewCar = !cameraViewCar;
      break;
    case 65: //a
      scene.traverse(function (node){
        if(node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      })
      break;
	}
}
