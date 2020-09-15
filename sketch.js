const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var particles;
var plinkos = [];
var divisions =[];
var particle;

var divisionHeight=300;
var score =0;
var turn = 0;
var gameState ="start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,175));
    }

    for (var j = 75; j <=width; j=j+50) {
        plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,375));
    }
    
}
 
function draw() {
  background("black");
  textSize(20);
  fill("white");
  text("Score : "+score,20,40);
  text("Turns Played: #"+turn,620,40);
  text("Total Chances: #5", 620,60);
  
  textSize(20)
  text(" 500 ", 15, 550);
  text(" 500 ", 90, 550);
  text(" 500 ", 170, 550);
  text(" 500 ", 250, 550);
  text(" 100 ", 330, 550);
  text(" 100 ", 410, 550);
  text(" 100 ", 490, 550);
  text(" 200 ", 570, 550);
  text(" 200 ", 650, 550);
  text(" 200 ", 730, 550);

  Engine.update(engine);
  ground.display();
  
  if ( gameState =="end") {
    
    textSize(90);
    fill("white");
    text("GameOver", 150, 300);
  }  

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
  if(particle!=null)
  {
    particle.display();

    if (particle.body.position.y>760 && gameState==="start")
    {
        if (particle.body.position.x < 300 && particle.body.position.x > 0) 
        {
        score=score+500;      
        particle=null;
        if ( turn>= 5) 
        {
          gameState ="end"; 
        }                         
        }
        else if (particle.body.position.x < 600 && particle.body.position.x > 301  && gameState==="start") 
        {
          score = score + 100;
          particle=null;
          if ( turn>= 5)
          { 
            gameState ="end";
          }  
        }
        else if (particle.body.position.x < 900 && particle.body.position.x > 601  && gameState==="start")
        {
          score = score + 200;
          particle=null;
          if ( turn>= 5)
          {
            gameState ="end";
          }
        }      

    }

  }

   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }
 
}


function mousePressed()
{
  if( gameState==="start")
  {
     turn = turn+1;
     particle=new Particle(mouseX, 10, 10, 10); 
  }   
}