class Cheerio{
	constructor(x,y,z,scene){
		'use strict';
		this.cheerio = new THREE.Object3D();
		this.addCheerio(this.cheerio, x, y, z);
		scene.add(this.cheerio);
		this.cheerio.position.x = x;
		this.cheerio.position.y = y;
		this.cheerio.position.z = z;
	}

	addCherio(obj, x, y, z){
		'use strict';
		var geometry = new THREE.TorusGeometry(1, 0.3, 5, 10);
		material = new THREE.MeshBasicMaterial({color: 0xe5a734, wireframe:false});
		var torus = new THREE.Mesh(geometry, material);
		torus.position.set(x,y,z);
		torus.rotation.x = Math.PI / 2;
	}
}