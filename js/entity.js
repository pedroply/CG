class GameEntity {
	constructor(){

	}

	checkCollisions(obj){
		var distance = Math.pow((this.getPosition().x - obj.getPosition().x), 2) + Math.pow((this.getPosition().z - obj.getPosition().z), 2)
		+ Math.pow((this.getPosition().y - obj.getPosition().y), 2);
    	var radius_sum = Math.pow((this.getRadius() + obj.getRadius()), 2);
    	car.setButterControl(0);
        /*if (obj instanceof Cheerio && this instanceof Cheerio){
            if (radius_sum >= distance){
                console.log(this.getPosition().x, obj.getPosition().x);
            }
        }*/

    	if (this instanceof Car && obj instanceof Butter && this.getCollidedButter() != null && this.getCollidedButter().getPosition().x == obj.getPosition().x
			&& this.getCollidedButter().getPosition().y == obj.getPosition().y && this.getCollidedButter().getPosition().z == obj.getPosition().z){
    		this.setButterControl(1);
	        if (distance > radius_sum){
	          this.setCollidedButter(null);
	          car.resumeMovement();
      		}
    	}
        if (radius_sum >= distance){
            this.treatCollision(obj);
        }
    }
}
