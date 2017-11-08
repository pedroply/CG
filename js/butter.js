
class Butter extends GameEntity{

  constructor(scene, mat){
    'use strict';
    super();
  	var geometry = new THREE.CubeGeometry(3, 2, 7);
    this.butter = new THREE.Object3D();
    this.mesh = new THREE.Mesh(geometry, mat);
    this.butter.add(this.mesh);
    this.material = mat;
    this.radius = 3;
    this.inCollision = 1;

    if(Math.random() > 0.5){
    	this.butter.position.x = 13 + 22*Math.random(); //13 a 35
    }
    else {
      this.butter.position.x = -13 -22*Math.random(); //13 a 35
    }
    if(Math.random() > 0.5){
    	this.butter.position.z = 13 + 22*Math.random(); //13 a 35
    }
    else {
      this.butter.position.z = -13 -22*Math.random(); //13 a 35
    }
    this.butter.rotation.y = Math.random()*3.14*2;
  	this.butter.position.y = 1;
  	scene.add( this.butter );
  }

  getRadius(){
    return this.radius;
  }

  getPosition(){
    return this.butter.position;
  }

  treatCollision(obj){
  	if (obj instanceof Car){
  		obj.setCollidedButter(this);
  		if (obj.getSpeed() > 0){
  			if (this.inCollision){
	  			obj.stopFrontMovement();
	            obj.desccelerate(0);
	        }
  		}
  		else if (obj.getSpeed() < 0){
  			if (this.inCollision){
	  			obj.stopBackMovement();
	  			obj.desccelerate(0);
	  		}
  		}
  	}

  }

  update(){

  }

  setInCollision(num){
  	this.inCollision =num;
  }

  setLighting(materials, active){
    this.mesh.material = materials[3][active];
  }

  setBasicMaterial(materials, basic, previous){
    if (basic){
      this.setLighting(materials, previous);
    }
    else{
      this.mesh.material = materials[3][0];
  	}
  }

}
