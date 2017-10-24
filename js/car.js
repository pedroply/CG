

class Car {

  constructor(x, y, z, tam, scene) {
    'use strict';
    this.car = new THREE.Object3D();
    this.car.add(new THREE.AxisHelper(10));
    this.velocidade = new THREE.Vector3(0,0,0);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:false});
    this.vel = 0;
    this.addMainChassis(this.car, 0*tam, 1*tam, 0*tam,tam);
    this.addCockpit(this.car, -0.6*tam, 2*tam, 0*tam,tam);
    this.addWheel(this.car, 2*tam, 0.5*tam, 1.6*tam,tam);
    this.addWheel(this.car, 2*tam, 0.5*tam, -1.6*tam,tam);
    this.addWheel(this.car, -2*tam, 0.5*tam, 1.6*tam,tam);
    this.addWheel(this.car, -2*tam, 0.5*tam, -1.6*tam,tam);
    this.addLights(this.car, 3*tam, 1*tam, 1.2*tam,tam);
    this.addLights(this.car, 3*tam, 1*tam, -1.2*tam,tam);
    this.addAxis(this.car, 2*tam, 0.5*tam, 1.5*tam,tam);
    this.addAxis(this.car, 2*tam, 0.5*tam, -1.5*tam,tam);
    this.addAxis(this.car, -2*tam, 0.5*tam, 1.5*tam,tam);
    this.addAxis(this.car, -2*tam, 0.5*tam*tam, -1.5*tam,tam);
    //this.addSphereTest(this.car, 0*tam, 1*tam, 0*tam, tam);
    this.car.radius = 3.45*tam;
    scene.add(this.car);
    this.car.position.x = x;
    this.car.position.y = y;
    this.car.position.z = z;
  }

  /*addSphereTest(obj, x, y, z, tam){
    'use strict';
    var geometry = new THREE.SphereGeometry(3.45*tam, 8, 6);
    var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:false});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    obj.add(mesh);
  }*/

  addMainChassis(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.CubeGeometry(6*tam, 1*tam, 3*tam);
    var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:false});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    obj.add(mesh);
  }

  addCockpit(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.CubeGeometry(3*tam, 1*tam, 3*tam);
    var material = new THREE.MeshBasicMaterial({color: 0xff5520, wireframe:false});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    obj.add(mesh);
  }

  addWheel(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.TorusGeometry( 0.5*tam, 0.2*tam, 16*tam, 50*tam);
    var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe:false});
    var torus = new THREE.Mesh( geometry, material );
    torus.position.set(x,y,z);
    obj.add(torus);
  }

  addLights(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.CylinderGeometry( 0.2*tam, 0.1*tam, 0.1*tam, 32*tam );
    var material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe:false});
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.rotation.set(0,0,Math.PI/2);
    cylinder.position.set(x,y,z);
    obj.add( cylinder );
  }

  addAxis(obj, x, y, z,tam){
    'use strict';
    var geometry = new THREE.CylinderGeometry( 0.2*tam, 0.2*tam, 0.2*tam, 32 *tam);
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.rotation.set(Math.PI/2, 0, 0);
    cylinder.position.set(x,y,z);
    obj.add( cylinder );
  }

  accelerate(deltaT){
    this.vel += 30*deltaT;
    if(this.vel>30)
  	  this.vel=30;
  }

  accelerateBack(deltaT){
    this.vel -= 20*deltaT;
    if(this.vel<-10)
  	  this.vel=-10;
  }

  desccelerate(deltaT){
    this.vel *= 55*deltaT;
  }

  turnL(deltaT){
    this.car.rotation.y += 5*deltaT;
  }

  turnR(deltaT){
    this.car.rotation.y -= 5*deltaT;
  }

  update(deltaT){
    this.velocidade[0] = this.vel*Math.cos(this.car.rotation.y);
    this.velocidade[2] = -this.vel*Math.sin(this.car.rotation.y);
    this.car.position.x += this.velocidade[0]*deltaT;
    this.car.position.z += this.velocidade[2]*deltaT;
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

}
