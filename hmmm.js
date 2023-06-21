var up, down, left, right, uimg, dimg, limg, rimg, button, buttonimg;
var dep=4;
var iterations=0;
var ready=false;
var direction = "Up (North)";
var padding1="";
var padding2="";
function preload() {
  uimg=loadImage("Top.jpg");
  rimg=loadImage("Right.jpg");
  limg=loadImage("Left.jpg");
  buttonimg=loadImage("spin.png");
  dimg=loadImage("Bottom.jpg");
}

function setup () {
  createCanvas(600, 600);
  down=createSprite(300,300,400,400);
  down.addImage(dimg);
  down.scale=1.5;

    left=createSprite(300,300,400,400);
  left.addImage(limg);
  left.scale=1.5;
    right=createSprite(300,300,400,400);
  right.addImage(rimg);
  right.scale=1.5;
      up=createSprite(300,300,400,400);
  up.addImage(uimg);
  up.scale=1.5;
  button=createSprite(300,540);
  button.addImage(buttonimg)
  button.scale=0.3;
    strokeWeight=100;
  stroke("black")
  text(direction, 280, 70)
  edges = createEdgeSprites();
}



function draw () {
  background(0);
  dep+=1;
  fill("white");
  strokeWeight=100;
  stroke("black")
  text(padding1+direction+padding2, 232, 70)
  
  if(mousePressedOver(button)){
    button.visible=false;
    ready=true;
  }
  if(ready==true){
    if (frameCount%8==0 && iterations <25){
      iterations+=1;
          var rand = Math.round(random(1,4));
console.log(rand)
      if(rand==1){
        direction="Up (North)";
        down.visible=false;
        left.visible=false;
        right.visible=false;
        up.visible=true;
      }else if(rand==2){
        direction="Down (South)";
        down.visible=true;
        left.visible=false;
        right.visible=false;
        up.visible=false;
      }else if(rand==3){
        direction="Left (West)";
        down.visible=false;
        left.visible=true;
        right.visible=false;
        up.visible=false;
      }else if(rand==4){
        direction="Right (East)";
        down.visible=false;
        left.visible=false;
        right.visible=true;
        up.visible=false;
      }
      
    }
    
    if (iterations >=25){
      button.visible=true;
      padding1="The result is ";
      padding2="!"
      ready=false;
      iterations=0;
    }
   if(mousePressedOver(button)){
    button.visible=false;
    ready=true;
     padding1="";
     padding2="";
  }
  }
  drawSprites();
  
}
