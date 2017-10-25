
class Cheerio {
	constructor(x,y,z,scene){
		'use strict';
		var geometry = new THREE.TorusGeometry(1, 0.3, 5, 10);
		material = new THREE.MeshBasicMaterial({color: 0xe5a734, wireframe:false});
		this.cheerio = new THREE.Object3D();
		this.cheerio.add(new THREE.Mesh(geometry, material));
		this.velocidade = new Array();
		this.cheerio.position.x = x;
		this.cheerio.position.y = y;
		this.cheerio.position.z = z;
		this.cheerio.radius = 1;
		this.cheerio.rotation.x = Math.PI/2;
		scene.add(this.cheerio);
		this.velocidade[0] = 0;
		this.velocidade[2] = 0;
	}

	getPosition(){
		return this.cheerio.position;
	}

	getRadius(){
		return this.cheerio.radius;
	}

	treatCollision(obj){
		var aux = new Array();
		aux[1] = -obj.getPosition().x+this.getPosition().x;
		aux[3] = -obj.getPosition().z+this.getPosition().z;
		aux[5] = aux[1]/Math.sqrt(Math.pow(aux[1],2)+Math.pow(aux[3],2));
		aux[6] = aux[3]/Math.sqrt(Math.pow(aux[1],2)+Math.pow(aux[3],2));
		aux[0] = aux[5]*Math.sqrt(Math.pow(obj.getVelocity()[0],2)+Math.pow(obj.getVelocity()[2],2));
		aux[2] = aux[6]*Math.sqrt(Math.pow(obj.getVelocity()[0],2)+Math.pow(obj.getVelocity()[2],2));
		this.velocidade[0] = aux[0];
		this.velocidade[2] = aux[2];
		var lenght_inside = obj.getRadius()+this.getRadius()-Math.sqrt(Math.pow(aux[1],2)+Math.pow(aux[3],2));
		this.cheerio.position.x += aux[5]*lenght_inside;
    this.cheerio.position.z += aux[6]*lenght_inside;
	}

	update(deltaT){
		this.cheerio.position.x += this.velocidade[0]*deltaT;
    this.cheerio.position.z += this.velocidade[2]*deltaT;
		this.velocidade[0] *= 55*deltaT;
		this.velocidade[2] *= 55*deltaT;
  }

	getVelocity(){
    return this.velocidade;
  }
}
