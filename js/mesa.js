
var camera, scene, renderer, material, aspectratio, velocidade,vel, objs = new Array();

var car, gas = false, left = false, right = false, back = false, cameraViewCar = 1;

var clock = new THREE.Clock;

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

function numeroLaranjas(num_lar){
  var i, raio;
  for(i = 1; i <= num_lar ; i++ ){
    raio = Math.random()*10 - 5;
    if(raio < 2.5){
    	raio = 2.5;
    }
    objs.push(new Laranja(raio, scene));
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

function numeroButters(num_But){
  var i;
  for(i = 1; i <= num_But ; i++ ){
    objs.push(new Butter(scene));
  }
}

function createScene(){
  'use strict';
  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(10));
  var inner, outter;

  car = new Car(0, 0, 20, 1, scene);

  createTable(0,0,0);
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

function animate() {
  'use strict';
  var elapsedTime = clock.getDelta ();

  //console.log(car.userData.step);

  if(gas)
	  car.accelerate(elapsedTime);
  else if(back)
    car.accelerateBack(elapsedTime);
  else
    car.desccelerate(elapsedTime);

  if(left){
	  car.turnL(elapsedTime);
  }

  if(right){
  	 car.turnR(elapsedTime);
  }

  car.update(elapsedTime);


  if(cameraViewCar == 3){
  	camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.x = car.getPosition().x-(10*Math.cos(car.getRotation().y));
    camera.position.y = 10;
    camera.position.z = car.getPosition().z+(10*Math.sin(car.getRotation().y));
    camera.lookAt(car.getPosition());
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
