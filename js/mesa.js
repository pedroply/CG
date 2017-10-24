
var camera, scene, renderer, material, aspectratio, velocidade,vel, objs = new Array();

var car, gas = false, left = false, right = false, back = false, cameraViewCar = 1;

var clock = new THREE.Clock;

var ratio = 2.07;
var scale = 0.013;
var scale_width;
var scale_height;
var last_width;
var last_height;

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
  var i;
  for(i = 1; i <= num_lar ; i++ ){
    objs.push(new Laranja(scene));
  }
}

function createInnerBorder(num, spacing, starting){
	var inner;
	for (inner = 0; inner <= starting && num > 0; inner += spacing){
      objs.push(new Cheerio(inner, 0.25, starting, scene));
      objs.push(new Cheerio(inner, 0.25, -starting, scene));
      if (inner != 0){
	      objs.push(new Cheerio(-inner, 0.25, starting, scene));
	      objs.push(new Cheerio(-inner, 0.25, -starting, scene));
	      objs.push(new Cheerio(-starting, 0.25, -inner, scene));
	      objs.push(new Cheerio(starting, 0.25, -inner, scene));
	      num = num - 2;
	  }
	  else{
	  	num--;
	  }
	  objs.push(new Cheerio(-starting, 0.25, inner, scene));
    objs.push(new Cheerio(starting, 0.25, inner, scene));
  }
}

function createOutterBorder(num, spacing, starting){
	var outter;
	for (outter = 0; outter <= starting && num > 0; outter += spacing){
      objs.push(new Cheerio(outter, 0.25, starting, scene));
      objs.push(new Cheerio(outter, 0.25, -starting, scene));
      if (outter != 0){
	      objs.push(new Cheerio(-outter, 0.25, starting, scene));
	      objs.push(new Cheerio(-outter, 0.25, -starting, scene));
	      objs.push(new Cheerio(-starting, 0.25, -outter, scene));
	      objs.push(new Cheerio(starting, 0.25, -outter, scene));
	      num = num - 2;
	  }
	  else{
	  	num--;
	  }
	  objs.push(new Cheerio(-starting, 0.25, outter, scene));
    objs.push(new Cheerio(starting, 0.25, outter, scene));
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
  car = new Car(-20, 0, 30, 1, scene);

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


/*Main function for window resize*/
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    if(cameraViewCar == 1)
      if (window.innerWidth / window.innerHeight > ratio)
          resizeOrtCamera(scale_height);
      else
          resizeOrtCamera(scale_width);

    else if(cameraViewCar == 2 || cameraViewCar == 3){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
}

/*OrthographicCamera resize function*/
function resizeOrtCamera(scale) {
    camera.left = -window.innerWidth / scale;
    camera.right = window.innerWidth / scale;
    camera.top = -window.innerHeight / scale;
    camera.bottom = window.innerHeight / scale;
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

function checkLimits(new_x, new_z){
  if (new_x + car.getRadius() > 40 || new_x - car.getRadius() < -40 || new_z + car.getRadius() > 40 || new_z - car.getRadius() < -40){
    car.setPosition(0,0,20);
    car.desccelerate(0);
  }
}

function checkCollisions(new_car_x, new_car_z){
  var i;
  for (i=0 ; i < objs.length; i++){
    var distance = Math.pow((car.getPosition().x - objs[i].getPosition().x), 2) + Math.pow((car.getPosition().z - objs[i].getPosition().z), 2);
    var radius_sum = Math.pow((car.getRadius() + objs[i].getRadius()), 2);
    if (radius_sum >= distance){
      if (objs[i] instanceof Laranja){
        car.setPosition(0,0,20);
        car.desccelerate(0);
      }
      if (objs[i] instanceof Butter){
        //car.desccelerate(0);
      }
    }
  }
}

function animate() {
  'use strict';
  var elapsedTime = clock.getDelta ();
  //var previous_pos_x = car.position.x;
  //var previous_pos_y = car.position.y;
  var updated_pos_x;
  var updated_pos_z;


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
  updated_pos_x = car.getPosition().x;
  updated_pos_z = car.getPosition().z;
  checkLimits(updated_pos_x, updated_pos_z);
  checkCollisions(updated_pos_x, updated_pos_z);
  var i;
  for(i = 0; i<objs.length; i++){
    objs[i].update(elapsedTime);
  }

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
