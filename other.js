var computerpaddle, playerpaddle, ball, edges;
var gamestate = "serve";
var playerscore = 0;
var compscore = 0;
var scoresound, wallhitsound, hitsound;
var comppaddle, playpaddle;
var emoji, pic;
function preload() {
  scoresound = loadSound("score.mp3");
  wallhitsound = loadSound("wall_hit.mp3");
  hitsound = loadSound("hit.mp3");
  comppaddle=loadImage("Screenshot_2023-06-20_at_11.20.55-removebg-preview.png")
  playpaddle=loadImage("Screenshot_2023-06-20_at_11.19.55-removebg-preview-removebg-preview.png")
  pic=loadImage("image-removebg-preview (5).png")
}

function setup () {
  createCanvas(400, 400);
  computerpaddle = createSprite(50, 200, 10, 80);
  playerpaddle = createSprite(380, 200, 10, 80);
  computerpaddle.addImage(comppaddle);
  computerpaddle.scale=0.1;
  playerpaddle.addImage(playpaddle);
  playerpaddle.scale=0.12;
  ball = createSprite(200, 200, 10, 10);
  ball.addImage(pic);
  ball.scale=0.03;
  edges = createEdgeSprites();
}



function draw () {
  console.log(Math.round(random(1,5)))
  background("lavender");
  text(compscore, 180, 20);
  text(playerscore, 211, 20);
  if (gamestate === "serve") {
   text ("Press Space To Serve", 150, 180); 
    ball.x=200;
    ball.y=200;
    computerpaddle.y=ball.y;
  }
  drawnet();
  playerpaddle.x = 380;
  playerpaddle.y = mouseY;
  computerpaddle.x = 20;
  if(gamestate=="play"){
  var rand=Math.round(random(1,2));
  if (rand==1){
      computerpaddle.y = ball.y+Math.round(random(0,100));

  } else if (rand==2){
      computerpaddle.y = ball.y-Math.round(random(0,100));
    
  }}
  
  if (ball.isTouching(computerpaddle)|| ball.isTouching(playerpaddle)) {
    hitsound.play();
  }
  
  if (ball.isTouching(edges[3])|| ball.isTouching(edges[2])) {
    wallhitsound.play();
  }
  
  if (keyDown("space")&& gamestate === "serve") { 
    serve ();
    gamestate = "play";
      }
  
  if (ball.x > 400 || ball.x < 0) {
    scoresound.play(); 
    if (ball.x > 400) {
      compscore = compscore + 1;
    }
    if (ball.x < 0) {
      playerscore = playerscore + 1;
    }
    reset();  
    gamestate = "serve";
  }
  if (compscore === 5) {
    gamestate = "over"
    text ("Pepsi Wins", 170, 160);
    text ("Press R To Restart", 150, 180);
    ball.x=200;
    ball.y=200;
  }

  if (playerscore === 5) {
    gamestate = "over"
    text ("You Won!", 170, 160);
    text ("Press R To Restart", 150, 180);
    ball.x=200;
    ball.y=200;
  }
  
  if (keyDown ("r") && gamestate === "over") {
    gamestate = "serve";
    compscore = 0;
    playerscore = 0;   
  }
  
  ball.bounceOff(edges[3]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(playerpaddle);
  ball.bounceOff(computerpaddle)
  
  
  drawSprites();
  
}

function drawnet () {
  for (var i = 0; i <= 400; i += 20) {
    line (200, i, 200, i+10);
    
  }
}

function serve () {     
  var abc=Math.round(random(1,2))
  if(abc==1){ 
    ball.velocityX = 9;
    ball.velocityY = 12;
  }else{
    ball.velocityX = 9;
    ball.velocityY = -12;
  }
}

function reset () {
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.veloictyY = 0;   
  
}