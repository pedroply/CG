
class Laranja {
  constructor(r, scene){
    'use strict';
    var geometry = new THREE.SphereGeometry( r, 15, 16 );
    var material = new THREE.MeshBasicMaterial( {color: 0xFF6E0E, wireframe: false} );
    this.laranja = new THREE.Object3D();

    this.laranja.add(new THREE.Mesh( geometry, material ));

    this.laranja.position.x = Math.random() - 0.5;
    this.laranja.position.z = Math.random() - 0.5;
    this.laranja.position.multiplyScalar( 80 );
    this.laranja.position.y = r;
    this.laranja.radius = r;
    this.addPeLaranja(this.laranja, 0,0,0,r);
    scene.add(this.laranja);
  }

  addFolhaLaranja(obj, x, y, z){
    'use strict';
    var geometry = new THREE.CubeGeometry(0.3,0.8, 1.3);
    var material = new THREE.MeshBasicMaterial( {color: 0x009900, wireframe: false} );
    var folha = new THREE.Mesh( geometry, material );
    folha.position.set(x,y,z + 0.80);

    obj.add(folha);
  }

  addPeLaranja(obj, x, y, z, raio){
    'use strict';
    var geometry = new THREE.CubeGeometry(0.3, 2, 0.3);
    var material = new THREE.MeshBasicMaterial( {color: 0x331900, wireframe: false} );
    var pe = new THREE.Mesh( geometry, material );
    pe.position.set(x,raio + 1,z);

    this.addFolhaLaranja(pe, 0,0,0);

    obj.add(pe);
  }

  getPosition(){
    return this.laranja.position;
  }

  getRadius(){
    return this.laranja.radius;
  }
}
