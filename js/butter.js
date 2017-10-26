
class Butter extends GameEntity{

  constructor(scene){
    'use strict';
    super();
  	var geometry = new THREE.CubeGeometry(3, 2, 7);
  	var material = new THREE.MeshBasicMaterial({color: 0xffd633, wireframe:false});

    this.butter = new THREE.Object3D();
    this.butter.add(new THREE.Mesh(geometry, material));
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

}
