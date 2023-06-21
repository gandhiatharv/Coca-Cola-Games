var mario, mario_running, mario_collided, ground, invisibleGround, groundImage, bg, coin, coinimg;
var bricksGroup, brickImage, obstacleGroup, obstacleimg, obstacle1, obstacle2, obstacle3, obstacle4;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover, gameoverimg, restart, restartimg;
var dieSound, jumpSound, checkPointSound;
var colli=0;
var abc;
var initial = -3;
var highscore=0;

function preload(){
  bg = loadImage("bg.png");
  mario_running = loadAnimation("coke0.png", "coke1.png", "coke2.png");
  mario_collided = loadAnimation("topplecoke.png");
  groundImage = loadImage("ground2.png");
  brickImage = loadImage("brick.png");
  obstacleimg = loadAnimation("monst.png", "monst.png", "monst.png", "monst.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  coinimg = loadImage("coin.png");
}

function setup() {
  createCanvas(600, 350);
  
  mario = createSprite(50, 205, 20, 50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided", mario_collided);
  mario.scale = 0.065;
  
  mario.setCollider("rectangle", 0, 0, 230, mario.height+930);
  
  ground = createSprite(300, 330, 600, 20);
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  
  obstacleGroup = createGroup();
  bricksGroup = createGroup();
  
  
  invisibleGround = createSprite(200, 314, 600, 40);
  invisibleGround.visible = false;
   
  gameover = createSprite(300, 120);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;
  
  restart = createSprite(300, 150);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  

}

function draw() {
  mario.depth+=1
  if (colli==0){
      mario.setCollider("rectangle", 0, 0, 230, mario.height+930);

  }
    if (colli==1){
      mario.setCollider("rectangle", 0, 0, 230, mario.height+930);
      console.log(mario.x);
      console.log(mario.y);
      mario.y=300; 
      mario.x=75;
  }
 // mario.debug=true;
  background(bg);
  abc=createSprite(150,175,600,350)
    abc.addImage(bg);
  abc.scale = 1;
  abc.depth=0.5;

  fill("white");
  text("Caffeination: " + score, 480, 90); 
  
  text("High Score: " + highscore, 480, 110); 

  mario.depth = gameover.depth - 1;
  restart.depth = gameover.depth;
  
  if (gamestate === PLAY) {
    
    ground.velocityX = -(2+0.25*score/1);
      if (frameCount % 200 === 0 && score>0) {
    score-=1;
  }
    if (ground.x < 0) {
      ground.x = ground.width/2;
    }
    
    if (keyDown("space") ||mousePressedOver(mario)||mousePressedOver(ground)||mousePressedOver(abc)) {
      if(mario.y >= 230){
      mario.velocityY = -14;
      jumpSound.play();
    }}
  
    for (var i = 0; i < bricksGroup.length; i++) {
      if (bricksGroup.get(i).isTouching(mario)) {
        var rand = Math.round(random(1, 4));
        if(rand === 1) {
          var coin11 = createSprite(mario.x, mario.y, 10, 10);
          coin11.addImage(coinimg);
          coin11.scale = 0.05;
          coin11.lifetime=  100;
        } else if(rand === 2) {
          var coin21 = createSprite(mario.x, mario.y, 10, 10);
          coin21.addImage(coinimg);
          coin21.scale = 0.05; 
                    coin21.lifetime=  100;

          var coin22 = createSprite(mario.x, mario.y, 10, 10);
          coin22.addImage(coinimg);
          coin22.scale = 0.05;
                    coin22.lifetime=  100;

        } else if (rand === 3) {
          var coin31 = createSprite(mario.x, mario.y, 10, 10);
          coin31.addImage(coinimg);
          coin31.scale = 0.05;
                    coin31.lifetime=  100;

          var coin32 = createSprite(mario.x, mario.y, 10, 10);
          coin32.addImage(coinimg);
          coin32.scale = 0.05;
                    coin32.lifetime=  100;

          var coin33 = createSprite(mario.x, mario.y, 10, 10);
          coin33.addImage(coinimg);
          coin33.scale = 0.05;
                    coin33.lifetime=  100;

        } else if (rand === 4) {
          var coin41 = createSprite(mario.x, mario.y, 10, 10);
          coin41.addImage(coinimg);
          coin41.scale = 0.05;
                    coin41.lifetime=  100;

          var coin42 = createSprite(mario.x, mario.y, 10, 10);
          coin42.addImage(coinimg);
          coin42.scale = 0.05;
                    coin42.lifetime=  100;

          var coin43 = createSprite(mario.x, mario.y, 10, 10);
          coin43.addImage(coinimg);
          coin43.scale = 0.05;
                    coin43.lifetime=  100;

          var coin44 = createSprite(mario.x, mario.y, 10, 10);
          coin44.addImage(coinimg);
          coin44.scale = 0.05;
                    coin44.lifetime=  100;

        }
        bricksGroup.get(i).remove();
        score = score + 1;
      }
    }
    
    gameover.visible = false;
    restart.visible = false;
    
    spawnbricks();
    spawnobstacles();
  
    mario.velocityY = mario.velocityY + 0.8; 
    
    
    if (obstacleGroup.isTouching(mario)) {
      gamestate = END;
  
      dieSound.play();
      
      if (score > 0 && score %10 === 0) {
        checkPointSound.play();
      }
      
      
    }
    
  } else if (gamestate === END) {

    console.log("hi")
        if(score>highscore){
      highscore=score;
    }
          console.log(mario.x);
      console.log(mario.y);
          mario.setCollider("rectangle", 0, 0, 230, mario.height+930);
      mario.y=300; 
      mario.x=75;
      ground.velocityX = 0;
    
      mario.velocityY = 0;
    
      gameover.visible = true;
      restart.visible = true;

    
      obstacleGroup.setLifetimeEach(200);
      bricksGroup.setLifetimeEach(200);
        if (colli==1){
      mario.setCollider("rectangle", 0, 0, 230, mario.height+930);
      mario.y=300; 
      mario.x=75;
  }
      mario.changeAnimation("collided", mario_collided);
    
      bricksGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
    
      if (mousePressedOver(restart)) {
        reset();
      }
  mario.depth+=1
    restart.depth=mario.depth+1
    
  }
  
    mario.collide(invisibleGround);
  
  drawSprites();
}

function reset() {
  if (mousePressedOver(restart)) {
      colli=0;
      gamestate = PLAY
      gameover.visible = false;
      restart.visible = false;
    mario.x=75;
    mario.y=253.31;
      bricksGroup.destroyEach();
      obstacleGroup.destroyEach();
      mario.changeAnimation("running", mario_running);
      score = 0;
    
  }
}

function spawnbricks() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(600, 120, 40, 10);
    brick.y = Math.round(random(120, 180));
    brick.addImage(brickImage);
    brick.scale = 0.5;
    initial=initial-0.05;
    brick.velocityX = -(3+0.25*score/1);
    brick.depth = mario.depth;  
    brick.lifetime = 200;
    mario.depth = mario.depth + 1;
    
    bricksGroup.add(brick);
  }
}

function spawnobstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600, 270, 10, 40);
    obstacle.addAnimation("obstacles", obstacleimg);
    obstacle.velocityX = -(6+0.25*score/1);
    obstacle.lifetime = 200;
    obstacle.scale=0.18;
    obstacle.y=obstacle.y-20
    obstacle.debug=false;
          obstacle.setCollider("rectangle", 0, 0, 230, obstacle.height+66);
obstacle.depth=mario.depth-0.1
    
    obstacleGroup.add(obstacle);
  }
}