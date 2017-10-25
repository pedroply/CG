
class Laranja extends GameEntity {
  constructor(scene){
    'use strict';
    super();
    this.raio = Math.random()*2.5 + 2.5;
    var geometry = new THREE.SphereGeometry(this.raio, 15, 16);
    var material = new THREE.MeshBasicMaterial( {color: 0xFF6E0E, wireframe: false} );
    this.laranja = new THREE.Object3D();
    this.velocidade = new THREE.Vector3(0,0,0);
    this.scene = scene;
    this.timer = 0;
    this.time = 0;
    this.timeout = Math.random()*2;
    this.vel = 5*(this.time/30 + 0.5) + 5*Math.random();

    this.laranja.add(new THREE.Mesh( geometry, material ));

    this.laranja.position.x = 50;
    this.laranja.position.z = 50;
    this.laranja.position.y = this.raio;
    this.laranja.rotation.y = Math.random()*3.14*2;;
    this.addPeLaranja(this.laranja, 0,0,0, this.raio);
    this.scene.add(this.laranja);
  }

  addFolhaLaranja(obj, x, y, z){
    'use strict';
    var geometry = new THREE.CubeGeometry(0.3,0.8, 1.3);
    var material = new THREE.MeshBasicMaterial( {color: 0x009900, wireframe: false} );
    var folha = new THREE.Mesh( geometry, material );
    folha.position.set(x,y,z + 0.80);

    obj.add(folha);
  }

  addPeLaranja(obj, x, y, z, raio){
    'use strict';
    var geometry = new THREE.CubeGeometry(0.3, 2, 0.3);
    var material = new THREE.MeshBasicMaterial( {color: 0x331900, wireframe: false} );
    var pe = new THREE.Mesh( geometry, material );
    pe.position.set(x,raio + 1,z);

    this.addFolhaLaranja(pe, 0,0,0);

    obj.add(pe);
  }

  getPosition(){
    return this.laranja.position;
  }

  getRadius(){
    return this.raio;
    }

  treatCollision(obj){
    if (obj instanceof Car){
        car.setPosition(-20,0,30);
        car.desccelerate(0);
        car.setRotationX(0);
        car.setRotationY(0);
      }
  }

  update(deltaT){
    this.time += deltaT;
    if(this.timer < this.timeout){
      this.timer += deltaT;
      if(this.timer >= this.timeout){
        this.scene.add(this.laranja);
        this.laranja.position.x = 13*Math.random() - 13*Math.random();
        this.laranja.position.z = 13*Math.random() - 13*Math.random();
      }
    }
    else{
      this.velocidade[0] = this.vel*Math.cos(this.laranja.rotation.y);
      this.velocidade[2] = -this.vel*Math.sin(this.laranja.rotation.y);
      this.laranja.position.x += this.velocidade[0]*deltaT;
      this.laranja.position.z += this.velocidade[2]*deltaT;
      this.laranja.rotation.z -= this.vel*deltaT/this.raio;
      if(this.laranja.position.x+this.raio > 40 || this.laranja.position.x-this.raio < -40
      || this.laranja.position.z+this.raio > 40 || this.laranja.position.z-this.raio < -40){ //rest laranja
        this.timer = 0;
        this.timeout = Math.random()*2;
        this.scene.remove(this.laranja);
        this.raio = Math.random()*2.5 + 2.5;
        var geometry = new THREE.SphereGeometry(this.raio, 15, 16);
        var material = new THREE.MeshBasicMaterial( {color: 0xFF6E0E, wireframe: false} );
        this.laranja = new THREE.Object3D();
        this.velocidade = new THREE.Vector3(0,0,0);
        this.vel = 5*(this.time/30 + 0.5) + 5*Math.random();

        this.laranja.add(new THREE.Mesh( geometry, material ));

        this.laranja.position.x = 50;
        this.laranja.position.z = 50;
        this.laranja.position.y = this.raio;
        this.laranja.rotation.y = Math.random()*3.14*2;;
        this.addPeLaranja(this.laranja, 0,0,0, this.raio);
      }
    }
  }
}
