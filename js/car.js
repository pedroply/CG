

class Car extends GameEntity{

  constructor(x, y, z, tam, carMat, wheelMat, cockpitMat, scene) {
    'use strict';
    super();
    this.car = new THREE.Object3D();
    this.car.add(new THREE.AxisHelper(10));
    this.velocidade = new Array();
    this.vel = 0;
    this.collidedButter = null;
    this.collisionFront = 0;
    this.collisionBack = 0;
    this.butterControl = 0;
    this.carMat = carMat;
    this.wheelMat = wheelMat;
    this.cockpitMat = cockpitMat;
    this.chassis_mesh;
    this.wheel_mesh = new Array(3);
    this.cockpit_mesh;
    this.addMainChassis(this.car, 0*tam, 1*tam, 0*tam,tam);
    this.addCockpit(this.car, -0.6*tam, 2*tam, 0*tam,tam);
    this.addWheel(this.car, 2*tam, 0.5*tam, 1.6*tam,tam, 0);
    this.addWheel(this.car, 2*tam, 0.5*tam, -1.6*tam,tam,1);
    this.addWheel(this.car, -2*tam, 0.5*tam, 1.6*tam,tam,2);
    this.addWheel(this.car, -2*tam, 0.5*tam, -1.6*tam,tam,3);
    this.addLights(this.car, 3*tam, 1*tam, 1.2*tam,tam);
    this.addLights(this.car, 3*tam, 1*tam, -1.2*tam,tam);
    this.addAxis(this.car, 2*tam, 0.5*tam, 1.5*tam,tam);
    this.addAxis(this.car, 2*tam, 0.5*tam, -1.5*tam,tam);
    this.addAxis(this.car, -2*tam, 0.5*tam, 1.5*tam,tam);
    this.addAxis(this.car, -2*tam, 0.5*tam*tam, -1.5*tam,tam);
    this.car.radius = 3.45*tam;
    scene.add(this.car);
    this.car.position.x = x;
    this.car.position.y = y;
    this.car.position.z = z;
  }


  addMainChassis(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.CubeGeometry(6*tam, 1*tam, 3*tam);
    var mesh = new THREE.Mesh(geometry, this.carMat);
    mesh.position.set(x,y,z);
    this.chassis_mesh = mesh;
    obj.add(mesh);
  }

  addCockpit(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.CubeGeometry(3*tam, 1*tam, 3*tam);
    var mesh = new THREE.Mesh(geometry, this.cockpitMat);
    mesh.position.set(x,y,z);
    this.cockpit_mesh = mesh;
    obj.add(mesh);
  }

  addWheel(obj, x, y, z,tam,idx){
    'use strict';
    var geometry = new THREE.TorusGeometry( 0.5*tam, 0.2*tam, 10*tam, 10*tam);
    var torus = new THREE.Mesh( geometry, this.wheelMat );
    torus.position.set(x,y,z);
    this.wheel_mesh[idx] = torus;
    obj.add(torus);
  }

  addLights(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.CylinderGeometry( 0.2*tam, 0.1*tam, 0.1*tam, 10*tam );
    var cylinder = new THREE.Mesh( geometry, this.wheelMat );
    cylinder.rotation.set(0,0,Math.PI/2);
    cylinder.position.set(x,y,z);
    obj.add( cylinder );
  }

  addAxis(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.CylinderGeometry( 0.2*tam, 0.2*tam, 0.2*tam, 3 *tam);
    var cylinder = new THREE.Mesh( geometry, this.carMat );
    cylinder.rotation.set(Math.PI/2, 0, 0);
    cylinder.position.set(x,y,z);
    obj.add( cylinder );
  }

  accelerate(deltaT){
    if (this.collisionFront == 0){
      this.vel += 30*deltaT;
      if(this.vel>30)
    	  this.vel=30;
    }
  }

  accelerateBack(deltaT){
    if (this.collisionBack == 0){
      this.vel -= 20*deltaT;
      if(this.vel<-10)
    	  this.vel=-10;
      }
  }

  desccelerate(deltaT){
    this.vel *= 55*deltaT;
  }

  turnL(deltaT){
    if(this.vel > 0.1 || this.vel < -0.1)
      this.car.rotation.y += 0.2*this.vel*deltaT;
  }

  turnR(deltaT){
    if(this.vel > 0.1 || this.vel < -0.1)
      this.car.rotation.y -= 0.2*this.vel*deltaT;
  }

  update(deltaT){
    this.velocidade[0] = this.vel*Math.cos(this.car.rotation.y);
    this.velocidade[2] = -this.vel*Math.sin(this.car.rotation.y);
    this.car.position.x += this.velocidade[0]*deltaT;
    this.car.position.z += this.velocidade[2]*deltaT;
  }

  treatCollision(obj){
  }

  getPosition(){
    return this.car.position;
  }

  getRotation(){
    return this.car.rotation;
  }

  setPosition(new_x, new_y, new_z){
    this.car.position.x = new_x;
    this.car.position.y = new_y;
    this.car.position.z = new_z;
  }

  getRadius(){
    return this.car.radius;
  }

  setRotationX(value){
    this.car.rotation.x = value;
  }

  setRotationY(value){
    this.car.rotation.y = value;
  }

  stopFrontMovement(){
      this.collisionFront = 1;
  }

  stopBackMovement(){
      this.collisionBack = 1;
  }

  setCollidedButter(obj){
    this.collidedButter = obj;
  }

  getCollidedButter(){
    return this.collidedButter;
  }

  resumeMovement(){
    this.collisionFront = 0;
    this.collisionBack = 0;
  }

  getSpeed(){
    return this.vel;
  }

  setSpeed(num){
    this.vel = num;
  }

  setButterControl(num){
    this.butterControl = num;
  }
  getVelocity(){
    return this.velocidade;
  }

  setLighting(materials, active){
    this.carMat = materials[0][active];
    this.wheelMat = materials[1][active];
    this.cockpitMat = materials[2][active];
    this.chassis_mesh.material = this.carMat;
    for (var i = 0; i < 4; i++){
      this.wheel_mesh[i].material = this.wheelMat;
    }
    this.cockpit_mesh.material = this.cockpitMat;
  }

  setBasicMaterial(materials, basic, previous){
    console.log(basic);
    if (basic){
      this.setLighting(materials, previous);
    }
    else{
      this.carMat = materials[0][0];
      this.wheelMat = materials[1][0];
      this.cockpitMat = materials[2][0];
      this.chassis_mesh.material = this.carMat;
      for (var i = 0; i < 4; i++){
        this.wheel_mesh[i].material = this.wheelMat;
      }
      this.cockpit_mesh.material = this.cockpitMat;
    }
  }

}
