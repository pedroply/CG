
class Cheerio {
	constructor(x,y,z,scene){
		'use strict';
		var geometry = new THREE.TorusGeometry(1, 0.3, 5, 10);
		material = new THREE.MeshBasicMaterial({color: 0xe5a734, wireframe:false});
		this.cheerio = new THREE.Object3D();
		this.cheerio.add(new THREE.Mesh(geometry, material));
		this.cheerio.position.x = x;
		this.cheerio.position.y = y;
		this.cheerio.position.z = z;
		this.cheerio.radius = 1;
		this.cheerio.rotation.x = Math.PI/2;
		scene.add(this.cheerio);
	}

	getPosition(){
		return this.cheerio.position;
	}

	getRadius(){
		return this.cheerio.radius;
	}
}