var sword, swordimg, fruit1img, fruit2img, fruit3img, fruit4img, monsterimg, gameoverimg, restart, restartimg, backgroundimg, kinfeSound, gameOverSound, back, fruit5img, fruit6img, fruit7img, fruit8img;
var three, two, one, zero, thimg, timg, oimh, zimg;
var line1, line2, line3, line4;
var fruitGroup, enemyGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var lives = 3;
var big, small, sound1, sound2;

function preload() {
  swordimg = loadImage("hand.png");
  thimg=loadImage("3hearts.png");
    timg=loadImage("2hearts.png");
    oimh=loadImage("1heart.png");
    zimg=loadImage("0hearts.png");

  fruit1img = loadImage("fruit1.png");
  fruit2img = loadImage("fruit2.png");
  fruit3img = loadImage("fruit3.png");
  fruit4img = loadImage("fruit4.png");
  fruit5img = loadImage("fruit5.png");
  fruit6img = loadImage("fruit6.png");
  fruit7img = loadImage("fruit7.png");
  fruit8img = loadImage("fruit8.png");
  monsterimg = loadImage("alien1.png");
  gameoverimg = loadImage("gameover1.png");
  backgroundimg = loadImage("background.png");
  restartimg = loadImage("restart1.png");
  knifeSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  sound1=loadSound("bigexplode.mp3");
  sound2=loadSound("smallexplode.mp3");

}

function setup() {
  createCanvas(600, 600);
  
  three=createSprite(100,50, 50, 50);
  three.addImage(thimg);
  three.scale=0.1;
   two=createSprite(100,50, 50, 50);
  two.addImage(timg);
  two.scale=0.1;
   one=createSprite(100,50, 50, 50);
  one.addImage(oimh);
  one.scale=0.1;
   zero=createSprite(100,50, 50, 50);
  zero.addImage(zimg);
  zero.scale=0.1;
  two.visible=false;
  one.visible=false;
  zero.visible=false;
  sword = createSprite(300, 150, 20, 20);
  sword.addImage(swordimg)
  sword.scale = 0.1;
  
  bottomline = createSprite(300, 620, 600, 5);
  
  restart = createSprite(300, 300, 50, 50);
  restart.addImage(restartimg);
  restart.scale = 1.3;
  restart.setCollider("circle", 0, 0, 20);
  
  back = createSprite(width/2, height/2, width, height);
  back.visible = false;
  
  line1 = createSprite(0, 300, 10, 600);
  line2 = createSprite(600, 300, 10, 600);
  line3 = createSprite(300, 0, 600, 10);
  line4 = createSprite(300, 600, 600, 10);
  line1.visible = false;
  line2.visible = false;
  line3.visible = false;
  line4.visible = false;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  fill("black");
  strokeWeight = 1;
  stroke("black");
}

function draw() {  
  background(backgroundimg);
  textSize(15);
  strokeWeight = 2;
  stroke("white");
  fill("white");
  text("Score: " + score, 500, 60); 
  
  sword.collide(line1);
  sword.collide(line2);
  sword.collide(line3);
  sword.collide(line4);
  restart.collide(line1);
  restart.collide(line2);
  restart.collide(line3);
  restart.collide(line4);
  
  if (gamestate === PLAY) {
          sword.x = mouseX;
    sword.y = mouseY;  
    
    fruits();
    enemy();
    restart.visible = false;
    sword.setCollider("rectangle", 0, 0, 40, 130, 40);
    gameOverSound.stop();
    sound1.stop();
    
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      knifeSound.play();
      score = score + 2;
    }
    if  (enemyGroup.isTouching(sword)) {
      enemyGroup.destroyEach();
      lives-=1;
      if(lives==1){
                    sound2.play();

        three.visible=false;
        two.visible=false;
        one.visible=true;
        zero.visible=false;
      } else if(lives==2){
                    sound2.play();

        three.visible=false;
        two.visible=true;
        one.visible=false;
        zero.visible=false;
      }
      if(lives==0){
           sound1.play();
      gamestate = END;  
                three.visible=false;
        two.visible=false;
        one.visible=false;
        zero.visible=true;
      }

    }
  } else if (gamestate === END) {
    restart.visible = true;
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    sword.setCollider("rectangle", 0, 0, 210, sword.height-18);
    
    sword.addImage(gameoverimg);
    sword.scale = 1.3;
    restart.y = sword.y+60;
    restart.x = sword.x;
    sword.x=300
    sword.y=250
    restart.x=300
    restart.y=300

    if (mousePressedOver(restart)) {
      gamestate = PLAY;
      sword.addImage(swordimg);
      sword.x = 300;
      sword.y = 150;
      sword.scale = 0.1;
      score = 0;
      lives=3;
      three.visible=true;
      two.visible=false;
      zero.visible=false;
      one.visible=false;
    }

  }
  
  drawSprites();
}


function fruits() {
   if (frameCount % 20 === 0){
     var side1 = Math.round(random(1, 4));
     if(side1 === 1) {
      var fruit1 = createSprite(Math.round(random(10, 590)), 600, 20, 20);
  fruit1.velocityY = -(14+0.5*score/4);
      var rand1 = Math.round(random(1, 8));
  switch(rand1) {
    case 1: fruit1.addImage(fruit1img);
        break;
    case 2: fruit1.addImage(fruit2img);
        break;
    case 3: fruit1.addImage(fruit3img);
        break;
    case 4: fruit1.addImage(fruit4img);
        break;
    case 5: fruit1.addImage(fruit5img);
        break;
    case 6: fruit1.addImage(fruit6img);
        break;
    case 7: fruit1.addImage(fruit7img);
        break;
    case 8: fruit1.addImage(fruit8img);
        break;
        
    default: break;
  }
  fruit1.scale = 0.15;
  fruit1.lifetime = 100;
      fruit1.depth=three.depth-1;

  fruitGroup.add(fruit1);
     
  } else if(side1 === 2) {
      var fruit2 = createSprite(Math.round(random(10, 590)), 0, 20, 20);
  fruit2.velocityY = (14+0.5*score/4);
      var rand2 = Math.round(random(1, 8));
  switch(rand2) {
    case 1: fruit2.addImage(fruit1img);
        break;
    case 2: fruit2.addImage(fruit2img);
        break;
    case 3: fruit2.addImage(fruit3img);
        break;
    case 4: fruit2.addImage(fruit4img);
        break;
    case 5: fruit2.addImage(fruit5img);
        break;
    case 6: fruit2.addImage(fruit6img);
        break;
    case 7: fruit2.addImage(fruit7img);
        break;
    case 8: fruit2.addImage(fruit8img);
        break;
        
    default: break;
  }
  fruit2.scale = 0.15;
  fruit2.lifetime = 100;
      fruit2.depth=three.depth-1;

  fruitGroup.add(fruit2);
     
  }else if(side1 === 3) {
      var fruit3 = createSprite(0, Math.round(random(10, 590)), 20, 20);
  fruit3.velocityX = (14+0.5*score/4);
      var rand3 = Math.round(random(1, 8));
  switch(rand3) {
    case 1: fruit3.addImage(fruit1img);
        break;
    case 2: fruit3.addImage(fruit2img);
        break;
    case 3: fruit3.addImage(fruit3img);
        break;
    case 4: fruit3.addImage(fruit4img);
        break;
    case 5: fruit3.addImage(fruit5img);
        break;
    case 6: fruit3.addImage(fruit6img);
        break;
    case 7: fruit3.addImage(fruit7img);
        break;
    case 8: fruit3.addImage(fruit8img);
        break;
        
    default: break;
  }
  fruit3.scale = 0.15;
  fruit3.lifetime = 100;
      fruit3.depth=three.depth-1;

  fruitGroup.add(fruit3);
     
  }else if(side1 === 4) {
      var fruit4 = createSprite(600, Math.round(random(10, 590)), 20, 20);
  fruit4.velocityX = -(14+0.5*score/4);
      var rand4 = Math.round(random(1, 8));
  switch(rand4) {
    case 1: fruit4.addImage(fruit1img);
        break;
    case 2: fruit4.addImage(fruit2img);
        break;
    case 3: fruit4.addImage(fruit3img);
        break;
    case 4: fruit4.addImage(fruit4img);
        break;
    case 5: fruit4.addImage(fruit5img);
        break;
    case 6: fruit4.addImage(fruit6img);
        break;
    case 7: fruit4.addImage(fruit7img);
        break;
    case 8: fruit4.addImage(fruit8img);
        break;
        
    default: break;
  }
  fruit4.scale = 0.15;
  fruit4.lifetime = 100;
  fruit4.depth=three.depth-1;
  fruitGroup.add(fruit4);
     
  }
  }
}

function enemy() {
  if (frameCount % 80 === 0) {
    var side2 = Math.round(random(1, 4));
    if(side2 === 1) {
    var monster1 = createSprite(Math.round(random(10, 590)), 600, 20, 20);
    monster1.addAnimation("moving", monsterimg);
    monster1.velocityY = -(11+3*score/10);
    monster1.scale = 0.15;
    monster1.lifetime = 100;
          monster1.depth=three.depth-1;

    enemyGroup.add(monster1);
    
    } else if (side2 === 2) {
    var monster2 = createSprite(Math.round(random(10, 590)), 0, 20, 20);
    monster2.addAnimation("moving", monsterimg);
    monster2.velocityY = (11+3*score/10);
    monster2.scale = 0.15;
    monster2.lifetime = 100;
          monster2.depth=three.depth-1;

    enemyGroup.add(monster2);
    } else if (side2 === 3) {
    var monster3 = createSprite(0, Math.round(random(10, 590)), 20, 20);
    monster3.addAnimation("moving", monsterimg);
    monster3.velocityX = (11+3*score/10);
    monster3.scale = 0.15;
    monster3.lifetime = 100;
          monster3.depth=three.depth-1;

    enemyGroup.add(monster3);
    } else if (side2 === 2) {
    var monster4 = createSprite(600, Math.round(random(10, 590)), 20, 20);
    monster4.addAnimation("moving", monsterimg);
    monster4.velocityX = -(11+3*score/10);
    monster4.scale = 0.15;
    monster4.lifetime = 100;
      monster4.depth=three.depth-1;

    enemyGroup.add(monster4);
    }

  }
}