
var camera, scene, renderer, material, aspectratio, velocidade,vel;

var car, gas = false, left = false, right = false, back = false, cameraViewCar = 1;

var clock = new THREE.Clock;

function addMainChassis(obj, x, y, z,tam){
  'use strict';
  var geometry = new THREE.CubeGeometry(6*tam, 1*tam, 3*tam);
  material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:false});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  obj.add(mesh);
}

function addCockpit(obj, x, y, z,tam){
  'use strict';
  var geometry = new THREE.CubeGeometry(3*tam, 1*tam, 3*tam);
  material = new THREE.MeshBasicMaterial({color: 0xff5520, wireframe:false});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  obj.add(mesh);
}

function addWheel(obj, x, y, z,tam){
  'use strict';
  var geometry = new THREE.TorusGeometry( 0.5*tam, 0.2*tam, 16*tam, 50*tam);
  material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe:false});
  var torus = new THREE.Mesh( geometry, material );
  torus.position.set(x,y,z);
  obj.add(torus);
}

function addLights(obj, x, y, z,tam){
  'use strict';
  var geometry = new THREE.CylinderGeometry( 0.2*tam, 0.1*tam, 0.1*tam, 32*tam );
  material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe:false});
  var cylinder = new THREE.Mesh( geometry, material );
  cylinder.rotation.set(0,0,Math.PI/2);
  cylinder.position.set(x,y,z);
  obj.add( cylinder );
}

function addAxis(obj, x, y, z,tam){
  'use strict';
  var geometry = new THREE.CylinderGeometry( 0.2*tam, 0.2*tam, 0.2*tam, 32 *tam);
  var cylinder = new THREE.Mesh( geometry, material );
  cylinder.rotation.set(Math.PI/2, 0, 0);
  cylinder.position.set(x,y,z);
  obj.add( cylinder );
}

function createCar(x, y, z, tam){
  'use strict';
  car = new THREE.Object3D();
  car.add(new THREE.AxisHelper(10));
  car.velocidade = new THREE.Vector3(0,0,0);
  car.vel_inst = 0;
  material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:false});
  vel = 0;
  addMainChassis(car, 0*tam, 1*tam, 0*tam,tam);
  addCockpit(car, -0.6*tam, 2*tam, 0*tam,tam);
  addWheel(car, 2*tam, 0.5*tam, 1.6*tam,tam);
  addWheel(car, 2*tam, 0.5*tam, -1.6*tam,tam);
  addWheel(car, -2*tam, 0.5*tam, 1.6*tam,tam);
  addWheel(car, -2*tam, 0.5*tam, -1.6*tam,tam);
  addLights(car, 3*tam, 1*tam, 1.2*tam,tam);
  addLights(car, 3*tam, 1*tam, -1.2*tam,tam);
  addAxis(car, 2*tam, 0.5*tam, 1.5*tam,tam);
  addAxis(car, 2*tam, 0.5*tam, -1.5*tam,tam);
  addAxis(car, -2*tam, 0.5*tam, 1.5*tam,tam);
  addAxis(car, -2*tam, 0.5*tam*tam, -1.5*tam,tam);

  scene.add(car);
  car.position.x = x;
  car.position.y = y;
  car.position.z = z;
}

function addTableTop(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(80, 0, 80);
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
  var geometry = new THREE.CubeGeometry(0.3,0.8, 1.3);
  material = new THREE.MeshBasicMaterial( {color: 0x009900, wireframe: false} );
  var folha = new THREE.Mesh( geometry, material );
  folha.position.set(x,y,z + 0.80);

  obj.add(folha);
}

function addPeLaranja(obj, x, y, z, raio){
  'use strict';
  var geometry = new THREE.CubeGeometry(0.3, 2, 0.3);
  material = new THREE.MeshBasicMaterial( {color: 0x331900, wireframe: false} );
  var pe = new THREE.Mesh( geometry, material );
  pe.position.set(x,raio + 1,z);

  addFolhaLaranja(pe, 0,0,0);

  obj.add(pe);
}

function createLaranja(raio){ //esta a criar umas dentro de outras
  'use strict';
  var geometry = new THREE.SphereGeometry( raio, 15, 16 );
  material = new THREE.MeshBasicMaterial( {color: 0xFF6E0E, wireframe: false} );
  var laranja = new THREE.Mesh( geometry, material );

  laranja.position.x = Math.random() - 0.5;
  laranja.position.z = Math.random() - 0.5;
  laranja.position.multiplyScalar( 80 );
  laranja.position.y = raio;
  addPeLaranja(laranja, 0,0,0,raio);
  scene.add( laranja );
}

function numeroLaranjas(num_lar){
  var i, raio;
  for(i = 1; i <= num_lar ; i++ ){
    raio = Math.random()*10 - 5;
    if(raio < 2.5){ 
    	raio = 2.5;
    }
    createLaranja(raio);
  }
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

function createButter(){//aparecem umas dentro das outras
	'use strict';
	var geometry = new THREE.CubeGeometry(3, 2, 7);
	material = new THREE.MeshBasicMaterial({color: 0xffd633, wireframe:false});
	var butter = new THREE.Mesh(geometry, material);

	butter.position.x = Math.random() - 0.5;
	butter.position.z = Math.random() - 0.5;
	butter.position.multiplyScalar( 80 );
	butter.position.y = 1;
	scene.add( butter );
}

function numeroButters(num_But){
  var i;
  for(i = 1; i <= num_But ; i++ ){
    createButter();
  }
}

function createScene(){
  'use strict';
  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(10));
  var inner, outter;

  createTable(0,0,0);
  createCar(0, 0, 20, 1); // o ultimo parametro é o tamanho
  numeroLaranjas(3);
  numeroButters(5);
  createInnerBorder(7, 3.5, 13);  //num torus, espacamento entre torus, distancia limite
  createOutterBorder(19, 3.5, 35); //num tem de ser impar, conta com o criado no 0 + o gerado acima e abaixo
}

function createCamera(){
  'use strict';
  camera = new THREE.OrthographicCamera( 140 / - 2, 140 / 2, 81 / 2, 81 / - 2, 1, 1000);
  camera.position.x = 0;
  camera.position.y = 50;
  camera.position.z = 0;
  camera.lookAt(scene.position);

}

function onResize(){
  'use strict';
  /*renderer.setSize(window.innerWidth, window.innerHeight);
  if (window.innerHeight > 0 && window.innerWidth > 0){
    camera.aspect = renderer.getSize().width / renderer.getSize().height;
    camera.updateProjectionMatrix();
  }*/
  /*renderer.setSize(window.innerWidth, window.innerHeight);
  if (window.innerHeight > 0 && window.innerWidth > 0){
  	camera.left = renderer.getSize().width/-5;
  	camera.right = renderer.getSize().width/5;
  	camera.top = renderer.getSize().height/5;
  	camera.bottom = renderer.getSize().height/-5;
  	console.log(camera.left, camera.right, camera.top, camera.bottom);
  }
  camera.updateProjectionMatrix();*/
  var new_height = window.innerWidth / aspectratio;
    if (new_height <= window.innerHeight ) {
        camera.aspect = aspectratio;
        renderer.setSize( window.innerWidth, new_height );
    } else {
        camera.aspect = 1/aspectratio;
        renderer.setSize( window.innerHeight * aspectratio, window.innerHeight );
    }
    camera.updateProjectionMatrix();
}

function render(){
  'use strict';
  renderer.render(scene, camera);
}

function init(){
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  aspectratio = window.innerWidth / window.innerHeight;
  document.body.appendChild(renderer.domElement);

  createScene();
  createCamera();


  window.addEventListener('resize', onResize);

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}

function checkLimits(new_x, new_y){
  if (new_x > 40 || new_x < -40 || new_y > 40 || new_y < -40){
    car.position.x = 0;
    car.position.y = 0;
    car.position.z = 0;
  }
}

function animate() {
  'use strict';
  var elapsedTime = clock.getDelta ();
  var previous_pos_x = car.position.x;
  var previous_pos_y = car.position.y;
  var updated_pos_x;
  var updated_pos_y;


  //console.log(car.userData.step);

  if(gas)
	vel += 30*elapsedTime;
  else if(back)
    vel -= 20*elapsedTime;
  else
	 vel *= 55*elapsedTime;

  if(left){
	  car.rotation.y += 5*elapsedTime;
  }

  if(right){
  	car.rotation.y -= 5*elapsedTime;
  }

  if(vel>30)
	  vel=30;
  if(vel<-10)
	  vel=-10;
  car.velocidade[0] = vel*Math.cos(car.rotation.y);
  car.velocidade[2] = -vel*Math.sin(car.rotation.y);
  updated_pos_x = car.position.x += car.velocidade[0]*elapsedTime;
  updated_pos_y = car.position.z += car.velocidade[2]*elapsedTime;
  checkLimits(updated_pos_x, updated_pos_y);

  if(cameraViewCar == 3){
  	camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.x = car.position.x-(10*Math.cos(car.rotation.y));
    camera.position.y = 10;
    camera.position.z = car.position.z+(10*Math.sin(car.rotation.y));
    camera.lookAt(car.position);
  }
  if(cameraViewCar == 2){
  	camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.x = 0;
    camera.position.y = 50;
    camera.position.z = 0;
    camera.lookAt(scene.position);
  }
  if(cameraViewCar == 1){
  	camera = new THREE.OrthographicCamera( 140 / - 2, 140 / 2, 81 / 2, 81 / - 2, 1, 1000);
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
		  if(gas || back)
		  left = true;
		  break;
		case 39:  //direita seta
		  if(gas || back)
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
    case 51: //3
      cameraViewCar = 3;
      break;
    case 50: //2
      cameraViewCar = 2;
      break;
    case 49: //1
      cameraViewCar = 1;
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


/*  
Fiz:
	laranjas aparecem aleatoriamente na mesa e tb variam de tamaho aleatoriamente
	as manteigas apararecem aleatoriamente na mesa
	as 3 camaras diferentes se clicares nas teclas '1', '2' e '3'
	o tamanho do carro ja varia todo so com a alteração de um valor 
	o carro so vira se estiver a mover-se para a frente ou para tras
Falta:
	as laranja nao podem aparecer uma dentro das outras
	mudar a wireframe para uma variavel
	o resto do enunciaado 
	            */