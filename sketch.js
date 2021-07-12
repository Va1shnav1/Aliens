
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var alienObj,groundObject;
var s1, s2, s3, s4, s5, s6, s7, s8;
var world;
var alienObj;
var chain;
var score=0;
var START=0;
var LAUNCHED=1;
var gameState=START;
var BG;
function preload() {
	BG = loadImage("Images/SpaceBG.jpg");
	
}
function setup() {
	createCanvas(1500, 600);
	engine = Engine.create();
	world = engine.world;

	s1=new Star(500,500,30);
	s2=new Star(800,130,30);
	s3=new Star(900,250,30);
	s4=new Star(700,430,30);
	s5=new Star(1190,450,30);
	s6=new Star(1250,250,30);
	s7=new Star(1000,370,30);
	s8=new Star(1050,60,30);
	groundObject=new Ground(width/2,600,width,20);
	
	alienObj = new Alien(230, 400, 30,{isStatic:false});

	chain = new Chain(alienObj.body, {x:240, y:425});
	Engine.run(engine);

}

function draw() {

  background(BG);
  //Add code for displaying text here!
  chain.display();
  s1.display();
  s2.display();
  s3.display();
  s4.display();
  s5.display();
  s6.display();
  s7.display();
  s8.display();
  alienObj.display();
  
  groundObject.display();
 

  detectCollision(alienObj, s1);
  detectCollision(alienObj, s2);
  detectCollision(alienObj, s3);
  detectCollision(alienObj, s4);
  detectCollision(alienObj, s5);
  detectCollision(alienObj, s6);
  detectCollision(alienObj, s7);
  detectCollision(alienObj, s8);

  textSize(30);
  fill("brown");
  text("score"+score, 500, 100);
}
function mouseDragged(){
	if(gameState===START){
   		Matter.Body.setPosition(alienObj.body, {x:mouseX, y:mouseY});
	}
}

function mouseReleased(){
    chain.fly();
	gameState=LAUNCHED;
}
function detectCollision(lalien, lstar){
	starBodyPos = lstar.body.position
	alienBodyPos = lalien.body.position

	var distance = dist(alienBodyPos.x, alienBodyPos.y, starBodyPos.x, starBodyPos.y)
	if(distance<=lstar.r+lalien.r){
		Matter.Body.setStatic(lstar.body, false)
		score=score+1;
	}
}
function keyPressed(){
	if (keyCode === 32){
		Matter.Body.setPosition(alienObj.body, {x:240, y:425})
		chain.attach(alienObj.body);
		gameState=START;
	}
}