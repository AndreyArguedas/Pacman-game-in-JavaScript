function Pacman(x,y){
    this.x = x;
    this.y = y;
    this.radius = 16;
    this.velocity = 32;
    this.direction = 0;
    this.frame = 0;

    this.move = function(d){
        if(d === 0){
          this.x += this.velocity;
          this.direction = d;
        }
        if(d === 1){
          this.y += this.velocity;
          this.direction = d;
        }
        if(d === 2){
            this.x -= this.velocity;
            this.direction = d;
        }
        if(d === 3){
          this.y -= this.velocity;
          this.direction = d;
        }
    }

    this.eats = function(food){
      var distance = dist(this.x,this.y,food.x,food.y);
      if(distance < this.radius + food.radius)
        return true;
      return false;
    }

    this.show = function(){
        image(pacmanImg,32*this.frame++,32*this.direction,32,32,this.x,this.y,32,32);
        this.frame = (this.frame === 5)?0:this.frame;
    }
}
