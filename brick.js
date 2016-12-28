function Brick(x,y){
  this.x = x;
  this.y = y;
  this.radius = 16;

  this.show = function(){
    //imageMode(CENTER)
    image(brickImg,this.x, this.y);
  }
}
