function Powerup(x,y){
    this.x = x;
    this.y = y;
    this.radius = 16;

    this.show = function(){
      image(powerUpImg,this.x,this.y);
    }
}
