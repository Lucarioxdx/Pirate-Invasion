const Engine = Matter.Engine;
const World  = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

let engine;
let world;
let canvas;
let backgroundImg;
let ground;
let tower;
let cannon;
let angle;
let cannonBall;

function preload (){
    backgroundImg = loadImage ("assets/background.gif");
}

function setup (){
    canvas = createCanvas (1200, 600);
    engine = Engine.create();
    world = engine.world;

    angleMode (DEGREES);
    angle = 15;

    ground = new Ground (0, height -1, width *2, 1);
    tower = new Tower (150, 350, 160, 310);
    cannon = new Cannon (170, 110, 130, 100, angle);
    cannonBall = new CannonBall (cannon.x, cannon.y);
}

function draw (){
    image (backgroundImg, 0, 0, 1200, 600);

    ground.display ();
    tower.display ();
    cannon.display ();
    cannonBall.display ();
}
function keyReleased (){
    if (keyCode === DOWN_ARROW){
        cannonBall.shoot ()
    }
}