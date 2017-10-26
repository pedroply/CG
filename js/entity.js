class GameEntity {
	constructor(){

	}

	checkCollisions(obj){
		var distance = Math.pow((this.getPosition().x - obj.getPosition().x), 2) + Math.pow((this.getPosition().z - obj.getPosition().z), 2) + Math.pow((this.getPosition().y - obj.getPosition().y), 2);
    	var radius_sum = Math.pow((this.getRadius() + obj.getRadius()), 2);

    	if (this instanceof Butter && obj instanceof Car && obj.getCollidedButter() != null && obj.getCollidedButter().getPosition().x == this.getPosition().x && obj.getCollidedButter().getPosition().y == this.getPosition().y && obj.getCollidedButter().getPosition().z == this.getPosition().z){
    		this.setInCollision(0);
	        if (distance > radius_sum){
	          obj.setCollidedButter(null);
              this.setInCollision(1);
	          car.resumeMovement();
      		}
    	}
        if (radius_sum >= distance){
            this.treatCollision(obj);
        }
    }
}