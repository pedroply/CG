
class Table extends GameEntity{

  constructor(scene, mat){
    'use strict';

    super();
    this.table = new THREE.Object3D();
    this.material = mat;
    this.addTableTop(this.table, 0, -5, 0);

    this.table.position.x = 0;
    this.table.position.y = 0;
    this.table.position.z = 0;
    scene.add(this.table);
  }

  addTableTop(obj, x, y, z){
    'use strict';

    var geometry = new THREE.CubeGeometry(80, 10, 80);
    this.mesa_mesh = new THREE.Mesh(geometry, this.material);
    console.log(this.material);
    this.mesa_mesh.position.set(x,y,z);
    obj.add(this.mesa_mesh);
  }


  getPosition(){
    return this.table.position;
  }

  update(){

  }

  getRadius(){

  }

  setLighting(materials, active){
    this.mesa_mesh.material = materials[5][active];
  }

  setBasicMaterial(materials, basic, previous){
    if (basic){
      this.setLighting(materials, previous);
    }
    else{
      this.mesa_mesh.material = materials[5][0];
  	}
  }

}