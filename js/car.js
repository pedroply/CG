

class Car extends GameEntity{

  constructor(x, y, z, tam, carMat, wheelMat, cockpitMat, scene) {
    'use strict';
    super();
    this.car = new THREE.Object3D();
    this.createCustomCar();
    this.car.add(new THREE.Mesh(this.geo, carMat));
    this.car.add(new THREE.AxisHelper(10));
    this.velocidade = new Array();
    this.vel = 0;
    this.turbo = false;
    this.handbrake = false;
    this.collidedButter = null;
    this.collisionFront = 0;
    this.collisionBack = 0;
    this.butterControl = 0;
    this.carMat = carMat;
    this.wheelMat = wheelMat;
    this.cockpitMat = cockpitMat;
    this.wheel_mesh = new Array(3);

    this.car.radius = 3.45*tam;
    scene.add(this.car);
    this.car.position.x = x;
    this.car.position.y = y;
    this.car.position.z = z;
}
  addCamera(obj){
    this.camera = obj;
    this.camera.position.x = this.car.position.x-(10*Math.cos(this.car.rotation.y));
    this.camera.position.y = 10;
    this.camera.position.z = this.car.position.z+(10*Math.sin(this.car.rotation.y));
    this.camera.lookAt(this.car.position);
  }

  accelerate(deltaT){
    if (this.collisionFront == 0){
      if(this.turbo)
        this.vel += 10*deltaT;
      this.vel += 30*deltaT;
      if(this.vel>30 && !this.turbo)
    	  this.vel=30;
      if(this.vel>50 && this.turbo)
        this.vel=50;
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
    this.camera.position.x = this.car.position.x-(10*Math.cos(this.car.rotation.y));
    this.camera.position.z = this.car.position.z+(10*Math.sin(this.car.rotation.y));
    this.camera.lookAt(this.car.position);
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
