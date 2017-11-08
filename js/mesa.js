
var camera, scene, renderer, material, mesa_mesh, aspectratio, velocidade,vel, objs = new Array();

var car, gas = false, left = false, right = false, back = false, elapsedTime;

var clock = new THREE.Clock;

var ratio = 2.07;
var scale = 0.0115;
var scale_width;
var scale_height;
var last_width;
var last_height;

var camera = new Array(3);
var cameraViewCar = 0; 

//             LIGHTS            //
var day = 1;
var sun;
var candles = new Array(6);
var candles_on = 0;
var sun_on = 0;

//             MATERIALS         //
var basic = 1;
var active = 2;  // Gouraud
var materials = new Array(6);
var carIndex = 0;
var wheelIndex = 1;
var cockpitIndex = 2;
var butterIndex = 3;
var cheerioIndex = 4;
var tableIndex = 5;
var orangeIndex = 6;
/*var wheelMat = new Array(3);
var carMat = new Array(3);
var orangeMat = new Array(3);
var cheerioMat = new Array(3);
var butterMat = new Array(3);
var tableMat = new Array(3);*/
// var pe&folhaMat 

//           WIREFRAME         //
var wires = false;

function addTableTop(obj, x, y, z){
  'use strict';
  var geometry = new THREE.CubeGeometry(80, 10, 80);
  mesa_mesh = new THREE.Mesh(geometry, material);
  mesa_mesh.position.set(x,y,z);
  obj.add(mesa_mesh);
}



function createTable(x, y, z){
  'use strict';
  var table = new THREE.Object3D();
  material = materials[tableIndex][0];

  addTableTop(table, 0, -5, 0);

  scene.add(table);
  table.position.x = x;
  table.position.y = y;
  table.position.z = z;
}

function numeroLaranjas(num_lar, mat){
  var i;
  for(i = 1; i <= num_lar ; i++ ){
    objs.push(new Laranja(scene, mat));
  }
}

function createInnerBorder(num, spacing, starting, mat){
	var inner;
	for (inner = 0; inner <= starting && num > 0; inner += spacing){
      objs.push(new Cheerio(inner, 0.25, starting, scene, mat));
      objs.push(new Cheerio(inner, 0.25, -starting, scene, mat));
      if (inner != 0){
	      objs.push(new Cheerio(-inner, 0.25, starting, scene, mat));
	      objs.push(new Cheerio(-inner, 0.25, -starting, scene, mat));
	      objs.push(new Cheerio(-starting, 0.25, -inner, scene, mat));
	      objs.push(new Cheerio(starting, 0.25, -inner, scene, mat));
	      num = num - 2;
	  }
	  else{
	  	num--;
	  }
	  objs.push(new Cheerio(-starting, 0.25, inner, scene, mat));
    objs.push(new Cheerio(starting, 0.25, inner, scene, mat));
  }
}

function createOutterBorder(num, spacing, starting, mat){
	var outter, cheerio;
	for (outter = 0; outter <= starting && num > 0; outter += spacing){
      objs.push(new Cheerio(outter, 0.25, starting, scene, mat));
      objs.push(new Cheerio(outter, 0.25, -starting, scene, mat));
      if (outter != 0){
	      objs.push(new Cheerio(-outter, 0.25, starting, scene, mat));
	      objs.push(new Cheerio(-outter, 0.25, -starting, scene, mat));
	      objs.push(new Cheerio(-starting, 0.25, -outter, scene, mat));
	      objs.push(new Cheerio(starting, 0.25, -outter, scene, mat));
	      num = num - 2;
	  }
	  else{
	  	num--;
	  }
	  objs.push(new Cheerio(-starting, 0.25, outter, scene, mat));
    objs.push(new Cheerio(starting, 0.25, outter, scene, mat));
  }
}

function numeroButters(num_But, mat){
  var i;
  for(i = 1; i <= num_But ; i++ ){
    objs.push(new Butter(scene, mat));
  }
}

function createScene(){
  'use strict';
  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(10));

  createMaterials();

  var inner, outter;
  car = new Car(-20, 0, 30, 1, materials[carIndex][0], materials[wheelIndex][0], materials[cockpitIndex][0], scene);

  createTable(0,0,0);
  numeroLaranjas(3, materials[orangeIndex][0]);
  createInnerBorder(7, 3.5, 13, materials[cheerioIndex][0]);  //num torus, espacamento entre torus, distancia limite
  createOutterBorder(19, 3.5, 35, materials[cheerioIndex][0]); //num tem de ser impar, conta com o criado no 0 + o gerado acima e abaixo
  numeroButters(5, materials[butterIndex][0]);
  objs.push(car);
}

function createCamera(){
  'use strict';
  createOrtCamera();
  createPerspCamera();
  createBehindCamera();
  //camera = new THREE.OrthographicCamera( 140 / - 2, 140 / 2, 81 / 2, 81 / - 2, 1, 1000);

}

function createPerspCamera(){
    camera[1] = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 1000);
    camera[1].position.x = 0;
    camera[1].position.y = 50;
    camera[1].position.z = 0;
    camera[1].lookAt(scene.position);
}

function createOrtCamera(){
  if (window.innerWidth / window.innerHeight > ratio)
        camera[0] = new THREE.OrthographicCamera(-window.innerWidth / scale_height, window.innerWidth / scale_height, window.innerHeight / scale_height, -window.innerHeight / scale_height, 1, 100);
    else
        camera[0] = new THREE.OrthographicCamera(-window.innerWidth / scale_width, window.innerWidth / scale_width, window.innerHeight / scale_width, -window.innerHeight / scale_width, 1, 100);
  last_width = window.innerWidth;
  last_height = window.innerHeight;
  camera[0].position.x = 0;
  camera[0].position.y = 50;
  camera[0].position.z = 0;
  camera[0].lookAt(scene.position);
}

function createBehindCamera(){
    camera[2] = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 1000);
    camera[2].position.x = car.getPosition().x-(10*Math.cos(car.getRotation().y));
    camera[2].position.y = 10;
    camera[2].position.z = car.getPosition().z+(10*Math.sin(car.getRotation().y));
    camera[2].lookAt(car.getPosition());
}

function createSun(){
  sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.position.set(0,40,100);
  scene.add(sun);
}

function createCandles(starting_x, starting_z, space_x, space_z){

  var i, j = 0, spacing_top = starting_x, spacing_bot = starting_x;
  for (i = 0; i < space_x * 6; i += space_x){
    if (j < 3){
      candles[j] = new THREE.PointLight(0xffffff, 0.00, 0, 1);
      candles[j].position.set(spacing_top, 6, starting_z);
      scene.add(candles[j]);
      spacing_top += space_x;
      j++;
    }
    else{
      candles[j] = new THREE.PointLight(0xffffff, 0.00, 0, 1);
      candles[j].position.set(spacing_bot, 6, starting_z - space_z);
      scene.add(candles[j]);
      spacing_bot += space_x;
      j++;
    }
  }
}

function candlesSwitch(num){
  var i;
  for (i = 0; i < 6; i++){
    if (num){
        candles[i].intensity = 0.5;
      }
    else{
      candles[i].intensity = 0.00;
    }
  }
}

function sunSwitch(num){
  if (num){
    sun.intensity = 3;
  }
  else{
    sun.intensity = 0.00;
  }
}

function revertBasic(materials, basic, previous){
  var i;
  for (i=0 ; i < objs.length; i++){
      objs[i].revertBasic(materials, basic, previous);
  }
  if (basic){
    mesa_mesh.material = materials[tableIndex][previous];
  }
  else{
    mesa_mesh.material = materials[tableIndex][0];
  }
}

function createMaterials(){
  materials[carIndex] = new Array(3);
  materials[carIndex][0] = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: wires });
  materials[carIndex][1] = new THREE.MeshLambertMaterial( {color: 0xff0000, wireframe: wires });
  materials[carIndex][2] = new THREE.MeshPhongMaterial( {color: 0xff0000, wireframe: wires , shininess: 100, specular: 0x111111});

  materials[wheelIndex] = new Array(3);
  materials[wheelIndex][0] = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: wires });
  materials[wheelIndex][1] = new THREE.MeshLambertMaterial( {color: 0x000000, wireframe: wires });
  materials[wheelIndex][2] = new THREE.MeshPhongMaterial( {color: 0x000000, wireframe: wires , shininess: 100, specular: 0x111111});

  materials[cockpitIndex] = new Array(3);
  materials[cockpitIndex][0] = new THREE.MeshBasicMaterial( {color: 0xff5520, wireframe: wires });
  materials[cockpitIndex][1] = new THREE.MeshLambertMaterial( {color: 0xff5520, wireframe: wires });
  materials[cockpitIndex][2] = new THREE.MeshPhongMaterial( {color: 0xff5520, wireframe: wires , shininess: 100, specular: 0x111111});

  materials[butterIndex] = new Array(3);
  materials[butterIndex][0] = new THREE.MeshBasicMaterial( {color: 0xffd633, wireframe: wires });
  materials[butterIndex][1] = new THREE.MeshLambertMaterial( {color: 0xffd633, wireframe: wires });
  materials[butterIndex][2] = new THREE.MeshPhongMaterial( {color: 0xffd633, wireframe: wires , shininess: 100, specular: 0x111111});

  materials[cheerioIndex] = new Array(3);
  materials[cheerioIndex][0] = new THREE.MeshBasicMaterial( {color: 0xe5a734, wireframe: wires });
  materials[cheerioIndex][1] = new THREE.MeshLambertMaterial( {color: 0xe5a734, wireframe: wires });
  materials[cheerioIndex][2] = new THREE.MeshPhongMaterial( {color: 0xe5a734, wireframe: wires , shininess: 100, specular: 0x111111});

  materials[tableIndex] = new Array(3);
  materials[tableIndex][0] = new THREE.MeshBasicMaterial( {color: 0x056C24, wireframe: wires });
  materials[tableIndex][1] = new THREE.MeshLambertMaterial( {color: 0x056C24, wireframe: wires });
  materials[tableIndex][2] = new THREE.MeshPhongMaterial( {color: 0x056C24, wireframe: wires , shininess: 100, specular: 0x111111});

  materials[orangeIndex] = new Array(3);
  materials[orangeIndex][0] = new THREE.MeshBasicMaterial( {color: 0xFF6E0E, wireframe: wires });
  materials[orangeIndex][1] = new THREE.MeshLambertMaterial( {color: 0xFF6E0E, wireframe: wires });
  materials[orangeIndex][2] = new THREE.MeshPhongMaterial( {color: 0xFF6E0E, wireframe: wires , shininess: 100, specular: 0x111111});
}

function changeShading(){
  var i;
  if (active == 1){
    active = 2;
  }
  else if (active == 2){
    active = 1;
  }
  for (i=0 ; i < objs.length; i++){
      objs[i].changeLightMaterial(materials, active);
  }
  mesa_mesh.material = materials[tableIndex][active];
}

/*Main function for window resize*/
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    scale_width = (window.innerWidth * scale_width) / last_width;
    scale_height = (window.innerHeight * scale_height) / last_height;
    last_width = window.innerWidth;
    last_height = window.innerHeight;

    if(cameraViewCar == 0){
      if (window.innerWidth / window.innerHeight > ratio)
          resizeOrtCamera(scale_height);
      else
          resizeOrtCamera(scale_width);
        }

    else if(cameraViewCar == 1){
      camera[1].aspect = window.innerWidth / window.innerHeight;
      camera[1].updateProjectionMatrix();
    }
    else{
      camera[2].aspect = window.innerWidth / window.innerHeight;
      camera[2].updateProjectionMatrix();
    }
}

/*OrthographicCamera resize function*/
function resizeOrtCamera(scale) {
    camera[0].left = -window.innerWidth / scale;
    camera[0].right = window.innerWidth / scale;
    camera[0].top = window.innerHeight / scale;
    camera[0].bottom = -window.innerHeight / scale;
    camera[0].updateProjectionMatrix();
}

function render(){
  'use strict';
  renderer.render(scene, camera[cameraViewCar]);
}

function init(){
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  aspectratio = window.innerWidth / window.innerHeight;
  document.body.appendChild(renderer.domElement);
  scale_width = window.innerWidth * scale;
  scale_height = window.innerHeight * scale * ratio;

  createScene();
  createCamera();
  createSun();
  createCandles(-30, 30, 30, 60);


  console.log(scene);

  window.addEventListener('resize', onResize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
}


function checkCollisions(){
  var i, j, control = 1;
  for (i=0 ; i < objs.length-1; i++){
    for (j=i+1; j < objs.length; j++){
      objs[i].checkCollisions(objs[j]);
    }

  }
}

function switchCamera(cameraToggle){
    cameraViewCar = cameraToggle-1;
}

function toggleWireframe() {
    wires = !wires;
    var material, i;
    for (i = 0; i < materials.length; i++) {
        for (mat of materials[i])
          mat.wireframe = wires;
    }
}

function animate() {
  'use strict';
  elapsedTime = clock.getDelta ();
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

  var i;
  for(i = 0; i<objs.length; i++){
    objs[i].update(elapsedTime);
  }
  if (cameraViewCar == 2) {
    camera[2].position.x = car.getPosition().x-(10*Math.cos(car.getRotation().y));
    camera[2].position.y = 10;
    camera[2].position.z = car.getPosition().z+(10*Math.sin(car.getRotation().y));
    camera[2].lookAt(car.getPosition());
  }
  checkCollisions();

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
      switchCamera(3);
      break;
    case 50: //2
      switchCamera(2);
      break;
    case 49: //1
      switchCamera(1);
      break;
    case 65: //a
      /*scene.traverse(function (node){
        if(node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      })*/
      toggleWireframe();
      break;

    case 67: // c
      candles_on = !candles_on;
      candlesSwitch(candles_on);
      break;
    case 71: //g
      basic = 0;
      changeShading();
      break;
    case 76: // l
      revertBasic(materials, basic, active);
      if (basic){
        basic = 0;
      }
      else{
        basic = 1;
      }
      break;
    case 78: // n
      sun_on = !sun_on;
      sunSwitch(sun_on);
      break;
    case 84:  //t
		  car.turbo = !car.turbo;
		  break;
    case 32:  //space
		  car.handbrake = !car.handbrake;
		  break;
	}
}
