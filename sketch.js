var brickImg;
var bricks = [];
var platform;
var foods = [];
var pacman;
var ghostRed;
var ghostPurple;
var ghostPink;
var ghostGreen;
var ghostRedImg;
var ghostPurpleImg;
var ghostPinkImg;
var ghostGreenImg;
var weakGhost;
var ghosts = [];
var activeGhosts = [];
var powerUps = [];
var powerUpImg;
var points = 0;

function preload(){
  brickImg = loadImage("images/roca.bmp");
  foodImg = loadImage("images/food.png");
  pacmanImg = loadImage("images/pac.png");
  ghostRedImg = loadImage("images/red.png");
  ghostPurpleImg = loadImage("images/purple.png");
  ghostPinkImg = loadImage("images/pink.png");
  ghostGreenImg = loadImage("images/green.png");
  powerUpImg = loadImage("images/grape.png");
  weakGhost = loadImage("images/weak.png");
}

function setup(){
  canvas = createCanvas(800,672);
  canvas.position();
  platform = new Platform(21,25);
  for(var i = 0; i < platform.getRows(); i++)
      for(var j = 0; j < platform.getColumns(); j++){
          if(platform.getElement(i,j) === '*')
              bricks.push(new Brick(j*32,i*32));
          else if(platform.getElement(i,j) === '-')
              foods.push(new Food(j*32,i*32));
          else if(platform.getElement(i,j) === 'p')
              pacman = new Pacman(j*32,i*32);
          else if(platform.getElement(i,j) === 'r')
              ghosts.push(new Ghost(j*32,i*32,ghostRedImg));
          else if(platform.getElement(i,j) === 'i')
              ghosts.push(new Ghost(j*32,i*32,ghostPinkImg));
          else if(platform.getElement(i,j) === 'g')
              ghosts.push(new Ghost(j*32,i*32,ghostGreenImg));
          else if(platform.getElement(i,j) === 'u')
              ghosts.push(new Ghost(j*32,i*32,ghostPurpleImg));
          else if(platform.getElement(i,j) === 'o')
              powerUps.push(new Powerup(j*32,i*32));
      }
      activateGhosts();

}

function draw(){
  background(0);
  frameRate(30);
  for(var i = 0; i < bricks.length; i++)
      bricks[i].show();
  for(var i = 0; i < foods.length; i++)
      foods[i].show();
  for(var i = 0; i < ghosts.length; i++)
      ghosts[i].show();
  for(var i = 0; i < powerUps.length; i++){
      powerUps[i].show();
      if(pacman.power(powerUps[i])){
        powerUps.splice(i,1);
        for(var i = 0; i < activeGhosts.length; i++){
            activeGhosts[i].isWeak = true;
          }
      }
  }
  pacman.show();
    textFont("Comic Sans MS");
    textSize(25);
    fill(255,244,244)
    text("Points: " + points, 30, 25);
    frameRate(5);
  for(var i = 0; i < activeGhosts.length; i++){
      activeGhosts[i].move(bricks);
      activeGhosts[i].show();
      if(pacman.collision(activeGhosts[i])){
        if(activeGhosts[i].isWeak === true){
          ghosts.push(new Ghost(32*12,32*10,activeGhosts[i].img));
          activeGhosts.splice(i,1);
          makeGhostStrong();
        }
        else{
          alert("YOU LOOSE :(");
          window.location.reload();
        }
      }
  }
  checkWin();
}

function activateGhosts(){
    if(ghosts.length > 0){
      activeGhosts.push(ghosts[ghosts.length - 1])
      ghosts.splice(ghosts.length - 1, 1)
      activeGhosts[activeGhosts.length - 1].outOfBox(platform);
    }
    setTimeout(activateGhosts,7000);
}

function makeGhostStrong(){
  for(var i = 0; i < activeGhosts.length; i++)
      activeGhosts[i].isWeak = true;
}

function checkWin(){
  print(foods.length);
  if(foods.length === 0){
    alert("You win");
    window.location.reload();
  }
}


function keyPressed(){
  if(keyCode === RIGHT_ARROW){
      if(platform.getElement(pacman.y/32,pacman.x/32 + 1) !== '*')
        pacman.move(0);
      for(var i = 0; i < foods.length; i++)
        if(pacman.eats(foods[i])){
            foods.splice(i,1)
          points=points+1;
        }
    }
    if(keyCode === DOWN_ARROW){
        if(platform.getElement(pacman.y/32 + 1,pacman.x/32) !== '*')
          pacman.move(1);
        for(var i = 0; i < foods.length; i++)
          if(pacman.eats(foods[i])){
              foods.splice(i,1)
            points=points+1;
          }
      }
      if(keyCode === LEFT_ARROW){
          if(platform.getElement(pacman.y/32,pacman.x/32 - 1) !== '*')
            pacman.move(2);
          for(var i = 0; i < foods.length; i++)
            if(pacman.eats(foods[i])){
                foods.splice(i,1)
              points=points+1;
            }
        }
        if(keyCode === UP_ARROW){
            if(platform.getElement(pacman.y/32 - 1,pacman.x/32) !== '*')
              pacman.move(3);
            for(var i = 0; i < foods.length; i++)
              if(pacman.eats(foods[i])){
                  foods.splice(i,1)
                points=points+1;
          }
        }

}
