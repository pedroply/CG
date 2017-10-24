
class Butter {
  constructor(scene){
    'use strict';
  	var geometry = new THREE.CubeGeometry(3, 2, 7);
  	var material = new THREE.MeshBasicMaterial({color: 0xffd633, wireframe:false});

    this.butter = new THREE.Object3D();
    this.butter.add(new THREE.Mesh(geometry, material));
    this.butter.radius = 3;

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
    return this.butter.radius;
  }

  getPosition(){
    return this.butter.position;
  }

  update(){

  }

}
