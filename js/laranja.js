
class Laranja extends GameEntity {
  constructor(scene,mat_org,mat_pe){
    'use strict';
    super();
    this.raio = Math.random()*2.5 + 2.5;
    var geometry = new THREE.SphereGeometry(this.raio, 10, 10);
    this.laranja = new THREE.Object3D();
    this.velocidade = new Array();
    this.scene = scene;
    this.timer = 0;
    this.time = 0;
    this.material = mat_org;
    this.peMaterial = mat_pe;
    this.timeout = Math.random()*2;
    this.vel = 5*(this.time/30 + 0.5) + 5*Math.random();
    this.mesh = new THREE.Mesh( geometry, this.material )
    this.laranja.add(this.mesh);
    this.laranja.position.x = 500;
    this.laranja.position.z = 500;
    this.laranja.position.y = this.raio;
    this.laranja.rotation.y = Math.random()*3.14*2;;
    this.addPeLaranja(this.laranja, 0,0,0);
    this.scene.add(this.laranja);
  }

  addPeLaranja(obj, x, y, z){
    'use strict';
    var geometry = new THREE.CubeGeometry(0.3*(this.raio/3), 1.5*(this.raio/3), 0.3*(this.raio/3));
    this.pe_mesh = new THREE.Mesh( geometry, this.peMaterial );
    this.pe_mesh.position.set(x,this.raio + (1.5*(this.raio/3) / 2),z);
    obj.add(this.pe_mesh);
  }

  getPosition(){
    return this.laranja.position;
  }

  getRadius(){
    return this.raio;
    }

  treatCollision(obj){
    if (obj instanceof Car){
        var i;
        for(i = -1; i<2; i++){
          var distance = Math.pow(this.getPosition().x - (obj.getPosition().x+i*(obj.getRadius()/2)*Math.cos(obj.getRotation().y)), 2)
          + Math.pow((this.getPosition().z - (obj.getPosition().z-i*(obj.getRadius()/2)*Math.sin(obj.getRotation().y))), 2)
          + Math.pow((this.getPosition().y - obj.getPosition().y), 2);
            var radius_sum = Math.pow((this.getRadius() + obj.getRadius()/2), 2);
          if(radius_sum >= distance){
            obj.die();

          }
        }
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
      || this.laranja.position.z+this.raio > 40 || this.laranja.position.z-this.raio < -40){
        this.timer = 0;
        this.timeout = Math.random()*2;
        this.scene.remove(this.laranja);
        this.raio = Math.random()*2.5 + 2.5;
        var geometry = new THREE.SphereGeometry(this.raio, 5, 5);
        this.laranja = new THREE.Object3D();
        this.velocidade = new Array();
        this.vel = 5*(this.time/30 + 0.5) + 5*Math.random();

        this.laranja.add(this.mesh);

        this.laranja.position.x = 50;
        this.laranja.position.z = 50;
        this.laranja.position.y = this.raio;
        this.laranja.rotation.y = Math.random()*3.14*2;;
        this.addPeLaranja(this.laranja, 0,0,0);
      }
    }
  }

  setLighting(materials, active){
    this.mesh.material = materials[6][active];
    this.peMaterial = materials[7][active];
    this.pe_mesh.material = this.peMaterial;

  }

  setBasicMaterial(materials, basic, previous){
    if (basic){
      this.setLighting(materials, previous);
    }
    else{
      this.mesh.material = materials[6][0];
      this.peMaterial = materials[7][0];
      this.pe_mesh.material = this.peMaterial;
    }
  }
}
