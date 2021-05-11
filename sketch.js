var PLAY = 1 ; END = 0
var gameState = PLAY;
var monkey , monkey_running;
var jungle , jungleImage ;
var stone , stoneImage ;
var banana , bananaImage ;
var score , deaths


function preload () {
 monkey_running = loadAnimation("rabbit.png") 
  
 jungleImage = loadImage("jungle.jpg") ;
 bananaImage = loadImage("carrot.png") ;
 stoneImage = loadImage("stone.png");
  
}

function setup() {
  createCanvas(displayWidth,displayHeight)
  
  jungle = createSprite(300,150,70,70)
  jungle.addImage(jungleImage);
  jungle.velocityX = -6 
  
  monkey = createSprite(100,450,20,40)
  monkey.addAnimation("runnning",monkey_running);
  monkey.scale = 0.3
  
  ground = createSprite(300,500,600,40)
  ground.visible = false;
  
  score = 0;
  death = 0;
  
  bananaGroup = createGroup();
  stoneGroup = createGroup();
}

function draw() {
 background (220); 
  
  if (monkey.isTouching(stoneGroup)) {
    gameState = END;
        
        }
  
  
  if (gameState === PLAY) {
     
   if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 2;
    }
    
    switch(score){
      case 10: monkey.scale=0.4; 
              break;
      case 20: monkey.scale=0.5;
              break;
      case 30: monkey.scale=0.6;  
              break;
      default : break;
        
    }
    
  if (jungle.x < 460 ) {
     jungle.x = jungle.width/2;
     
      }
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -30;
    }
  
  monkey.velocityY = monkey.velocityY + 1.8;
    
  monkey.collide(ground);
  bananas();
  stones();
}  
  
  else if (gameState === END) {
    reset();
         
           }
  
  if (gameState === END && keyDown("R")) {
      gameState = PLAY;
      monkey.visible = true;
      jungle.velocityX = -6
      }
  
  
 
  drawSprites();
  textSize(30);
  text("SCORE :"+score,400,30);
  if (gameState === END){
    stroke("white")
    textSize(25)
    fill("white")
    text("PRESS 'R' TO RESTART",200,200);
    
    
  }
  
}

function bananas () {
 if (frameCount % 120 === 0) {
    banana = createSprite (500,200,40,40);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.4 ;
    banana.velocityX = -5 ; 
    banana.lifetime = 300;
   
    bananaGroup.add(banana);
     }   
}

// creating the enemies
function stones () {
  if (frameCount % 200 === 0) {
    stone = createSprite (600,430,40,40);
    stone.addImage(stoneImage)
    stone.scale = 0.3 ;
    stone.velocityX = -7 ; 
    stone.lifetime = 300;
    stone.setCollider("rectangle",0,0,stone.width,stone.height)
    stone.debug = false;
    stone.depth = monkey.depth
    monkey.depth = stone.depth + 1;
    stoneGroup.add(stone);
     }   
  
}

function reset () {
 // gameState = PLAY;
  monkey.visible = false;
  score = 0;
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  jungle.velocityX = 0 ;
  
  
  
  
}
 