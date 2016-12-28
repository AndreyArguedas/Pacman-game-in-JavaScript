function Food(x,y){
    this.x = x;
    this.y = y;
    this.radius =16;

    this.show = function(){
        image(foodImg,x,y);
    }
}
