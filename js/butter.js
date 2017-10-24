
class Butter {
  constructor(scene){
    'use strict';
  	var geometry = new THREE.CubeGeometry(3, 2, 7);
  	var material = new THREE.MeshBasicMaterial({color: 0xffd633, wireframe:false});

    this.butter = new THREE.Object3D();
    this.butter.add(new THREE.Mesh(geometry, material));

  	this.butter.position.x = Math.random() - 0.5;
  	this.butter.position.z = Math.random() - 0.5;
  	this.butter.position.multiplyScalar( 80 );
  	this.butter.position.y = 1;
  	scene.add( this.butter );
  }

}
