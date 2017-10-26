
class Butter extends GameEntity{

  constructor(scene){
    'use strict';
    super();
  	var geometry = new THREE.CubeGeometry(3, 2, 7);
  	var material = new THREE.MeshBasicMaterial({color: 0xffd633, wireframe:false});
  	var aabb_x_lower;

    this.butter = new THREE.Object3D();
    this.butter.add(new THREE.Mesh(geometry, material));
    this.butter.add(new THREE.AxisHelper(10));
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
  	/*var y_pos = (this.butter.position.y + 1) * Math.sin(this.butter.rotation.y); 
  	var y_neg = (this.butter.position.y - 1) * Math.sin(this.butter.rotation.y); 
  	this.upperLimit = new THREE.Vector3(this.butter.position.x + 1.5 *, this.butter.position.y + y_pos, this.butter.position.z + 3.5);
  	this.lowerLimit = new THREE.Vector3(this.butter.position.x - 1.5, this.butter.position.y + y_neg, this.butter.position.z - 3.5);*/
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
  	this.inCollision = num;
  }

}
