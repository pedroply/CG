

class Car extends GameEntity{

  constructor(x, y, z, tam, carMat, wheelMat, cockpitMat, scene) {
    'use strict';
    super();
    this.car = new THREE.Object3D();
    //this.car.add(new THREE.AxisHelper(10));
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
    this.chassis_mesh;
    this.wheel_mesh = new Array(3);
    this.cockpit_mesh;
    this.lights = new Array();
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
    /*var geometry = new THREE.CubeGeometry(6*tam, 1*tam, 3*tam);*/

    var geometry = new THREE.Geometry();

    geometry.vertices.push( new THREE.Vector3( 3, -0.5, -1.5 ) );
    geometry.vertices.push( new THREE.Vector3( -3, -0.5, -1.5 ) );
    geometry.vertices.push( new THREE.Vector3( 3, -0.5, 1.5 ) );
    geometry.vertices.push( new THREE.Vector3( -3, -0.5, 1.5 ) );

    geometry.vertices.push( new THREE.Vector3( 3, 0.5, -1.5 ) );
    geometry.vertices.push( new THREE.Vector3( -3, 0.5, -1.5 ) );
    geometry.vertices.push( new THREE.Vector3( 3, 0.5, 1.5 ) );
    geometry.vertices.push( new THREE.Vector3( -3, 0.5, 1.5 ) );

    geometry.faces.push( new THREE.Face3( 2, 1, 0));
    geometry.faces.push( new THREE.Face3( 2, 3, 1));
    geometry.faces.push( new THREE.Face3( 4, 5, 6));
    geometry.faces.push( new THREE.Face3( 7, 6, 5));

    geometry.faces.push( new THREE.Face3( 4, 0, 1));
    geometry.faces.push( new THREE.Face3( 4, 1, 5));
    geometry.faces.push( new THREE.Face3( 6, 7, 3));
    geometry.faces.push( new THREE.Face3( 6, 3, 2));

    geometry.faces.push( new THREE.Face3( 7, 5, 3));
    geometry.faces.push( new THREE.Face3( 5, 1, 3));
    geometry.faces.push( new THREE.Face3( 4, 6, 2));
    geometry.faces.push( new THREE.Face3( 4, 2, 0));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var mesh = new THREE.Mesh(geometry, this.carMat);
    mesh.position.set(x,y,z);
    this.chassis_mesh = mesh;
    obj.add(mesh);
  }

  addCockpit(obj, x, y, z,tam){
    'use strict';
    //var geometry = new THREE.CubeGeometry(3*tam, 1*tam, 3*tam);
    var geometry = new THREE.Geometry();

    geometry.vertices.push( new THREE.Vector3( 1.5, -0.25, -1.5 ) );
    geometry.vertices.push( new THREE.Vector3( -1.5, -0.25, -1.5 ) );
    geometry.vertices.push( new THREE.Vector3( 1.5, -0.25, 1.5 ) );
    geometry.vertices.push( new THREE.Vector3( -1.5, -0.25, 1.5 ) );

    geometry.vertices.push( new THREE.Vector3( 0.4, 0.25, -1.5 ) );
    geometry.vertices.push( new THREE.Vector3( -0.8, 0.25, -1.5 ) );
    geometry.vertices.push( new THREE.Vector3( 0.4, 0.25, 1.5 ) );
    geometry.vertices.push( new THREE.Vector3( -0.8, 0.25, 1.5 ) );

    geometry.faces.push( new THREE.Face3( 2, 1, 0));
    geometry.faces.push( new THREE.Face3( 2, 3, 1));
    geometry.faces.push( new THREE.Face3( 4, 5, 6));
    geometry.faces.push( new THREE.Face3( 7, 6, 5));

    geometry.faces.push( new THREE.Face3( 4, 0, 1));
    geometry.faces.push( new THREE.Face3( 4, 1, 5));
    geometry.faces.push( new THREE.Face3( 6, 7, 3));
    geometry.faces.push( new THREE.Face3( 6, 3, 2));

    geometry.faces.push( new THREE.Face3( 7, 5, 3));
    geometry.faces.push( new THREE.Face3( 5, 1, 3));
    geometry.faces.push( new THREE.Face3( 4, 6, 2));
    geometry.faces.push( new THREE.Face3( 4, 2, 0));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var mesh = new THREE.Mesh(geometry, this.cockpitMat);
    mesh.position.set(x,y,z);
    this.cockpit_mesh = mesh;
    obj.add(mesh);
  }

  addWheel(obj, x, y, z,tam,idx){
    'use strict';
    //var geometry = new THREE.TorusGeometry( 0.5*tam, 0.2*tam, 10*tam, 10*tam);

    var geometry = new THREE.Geometry();

    geometry.vertices.push( new THREE.Vector3( 0, -0.4, -0.1 ) );
    geometry.vertices.push( new THREE.Vector3( 0.5, -0.2, -0.1 ) );
    geometry.vertices.push( new THREE.Vector3( -0.5, -0.2, -0.1 ) );
    geometry.vertices.push( new THREE.Vector3( -0.5, 0.2, -0.1 ) );
    geometry.vertices.push( new THREE.Vector3( 0.5, 0.2, -0.1 ) );
    geometry.vertices.push( new THREE.Vector3( 0, 0.4, -0.1 ) );

    geometry.vertices.push( new THREE.Vector3( 0, -0.4, 0.1 ) );
    geometry.vertices.push( new THREE.Vector3( 0.5, -0.2, 0.1 ) );
    geometry.vertices.push( new THREE.Vector3( -0.5, -0.2, 0.1 ) );
    geometry.vertices.push( new THREE.Vector3( -0.5, 0.2, 0.1 ) );
    geometry.vertices.push( new THREE.Vector3( 0.5, 0.2, 0.1 ) );
    geometry.vertices.push( new THREE.Vector3( 0, 0.4, 0.1 ) );

    geometry.faces.push( new THREE.Face3( 0, 2, 1));
    geometry.faces.push( new THREE.Face3( 1, 2, 4));
    geometry.faces.push( new THREE.Face3( 2, 3, 4));
    geometry.faces.push( new THREE.Face3( 3, 5, 4));

    geometry.faces.push( new THREE.Face3( 6, 7, 8));
    geometry.faces.push( new THREE.Face3( 7, 10, 8));
    geometry.faces.push( new THREE.Face3( 8, 10, 9));
    geometry.faces.push( new THREE.Face3( 9, 10, 11));

    geometry.faces.push( new THREE.Face3( 5, 9, 11));
    geometry.faces.push( new THREE.Face3( 3, 9, 5));
    geometry.faces.push( new THREE.Face3( 3, 2, 8));
    geometry.faces.push( new THREE.Face3( 3, 8, 9));

    geometry.faces.push( new THREE.Face3( 2, 0, 6));
    geometry.faces.push( new THREE.Face3( 6, 8, 2));
    geometry.faces.push( new THREE.Face3( 1, 7, 6));
    geometry.faces.push( new THREE.Face3( 6, 0, 1));

    geometry.faces.push( new THREE.Face3( 4, 10, 1));
    geometry.faces.push( new THREE.Face3( 10, 7, 1));
    geometry.faces.push( new THREE.Face3( 5, 11, 10));
    geometry.faces.push( new THREE.Face3( 10, 4, 5));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var torus = new THREE.Mesh( geometry, this.wheelMat );
    torus.position.set(x,y,z);
    this.wheel_mesh[idx] = torus;
    obj.add(torus);
  }

  addLights(obj, x, y, z,tam){
    'use strict';
    //var geometry = new THREE.CylinderGeometry( 0.2*tam, 0.1*tam, 0.1*tam, 10*tam );

    var geometry = new THREE.Geometry();

    geometry.vertices.push( new THREE.Vector3( 0, 0, 0.1 ) );
    geometry.vertices.push( new THREE.Vector3( 0, -0.1, -0.1 ) );
    geometry.vertices.push( new THREE.Vector3( 0, 0.1, -0.1 ) );

    geometry.vertices.push( new THREE.Vector3( 0.1, 0, 0.3 ) );
    geometry.vertices.push( new THREE.Vector3( 0.1, -0.3, -0.3 ) );
    geometry.vertices.push( new THREE.Vector3( 0.1, 0.3, -0.3 ) );

    geometry.faces.push( new THREE.Face3( 0, 2, 1));
    geometry.faces.push( new THREE.Face3( 3, 4, 5));
    geometry.faces.push( new THREE.Face3( 1, 4, 0));
    geometry.faces.push( new THREE.Face3( 0, 4, 3));

    geometry.faces.push( new THREE.Face3( 3, 5, 2));
    geometry.faces.push( new THREE.Face3( 2, 0, 3));
    geometry.faces.push( new THREE.Face3( 5, 1, 2));
    geometry.faces.push( new THREE.Face3( 5, 4, 1));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var cylinder = new THREE.Mesh( geometry, this.wheelMat );
    //cylinder.rotation.set(0,0,Math.PI/2);
    cylinder.position.set(x,y,z);
    obj.add( cylinder );

    var spotLight = new THREE.SpotLight( 0xffffff, 10, 22, Math.PI/4, 0.5, 0.9 );
    var spotLight_target = new THREE.Object3D();
    spotLight.position.set( x, y, z );
    spotLight_target.position.set( x+5, y, z);
    spotLight.target = spotLight_target;
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    this.lights[this.lights.length] = spotLight;
    obj.add( spotLight );
    obj.add( spotLight_target );
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
    if(this.vel>30)
      this.vel = 30;
    if(this.vel<-30)
      this.vel = -30;
    this.velocidade[0] = this.vel*Math.cos(this.car.rotation.y);
    this.velocidade[2] = -this.vel*Math.sin(this.car.rotation.y);
    this.car.position.x += this.velocidade[0]*deltaT;
    this.car.position.z += this.velocidade[2]*deltaT;
    console.log("xpos: ", this.car.position.x, "delta t: ", deltaT, "velocidade x: ", this.velocidade[0]);
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

  switchLights(){
    for(var i = 0; i < this.lights.length; i++){
      if(this.lights[i].intensity != 0){
        this.lights[i].intensity = 0;
      }
      else{
        this.lights[i].intensity = 10;
      }
    }
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
