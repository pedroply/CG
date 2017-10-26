
class Butter extends GameEntity{
  constructor(scene){
    'use strict';
    super();
  	var geometry = new THREE.CubeGeometry(7, 2, 3);
  	var material = new THREE.MeshBasicMaterial({color: 0xffd633, wireframe:false});

    this.butter = new THREE.Object3D();
    //this.butter.add(new THREE.AxisHelper(10));
    this.butter.add(new THREE.Mesh(geometry, material));
    this.radius = 4;
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

  getRotation(){
    return this.butter.rotation;
  }

  treatCollision(obj){
    if(obj instanceof Car){
			var i, j, collided = false;
			for(i = -1; i<2; i++){
        for(j = -1; j<2; j++){
  				var distance = Math.pow(this.getPosition().x+j*(this.getRadius()/2)*Math.cos(this.getRotation().y) - (obj.getPosition().x+i*(obj.getRadius()/2)*Math.cos(obj.getRotation().y)), 2)
  				+ Math.pow((this.getPosition().z-j*(this.getRadius()/2)*Math.sin(this.getRotation().y) - (obj.getPosition().z-i*(obj.getRadius()/2)*Math.sin(obj.getRotation().y))), 2)
  				+ Math.pow((this.getPosition().y - obj.getPosition().y), 2);
  		    	var radius_sum = Math.pow((this.getRadius()/2 + obj.getRadius()/2), 2);
  				if(radius_sum >= distance){
            collided = true;
  				}
        }
			}
      if(collided){
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
  }

  update(){

  }

  setInCollision(num){
    this.inCollision = num;
  }


}
