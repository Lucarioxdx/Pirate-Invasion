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
let balls = [];
let boat;
let boats = [];
let boatAnimation = [];
let boatSpriteData;
let boatSpriteSheet;

let brokenBoatAnimation = [];
let brokenBoatSpriteData;
let brokenBoatSpriteSheet;

let waterSplashAnimation = [];
let waterSplashSpriteData;
let waterSplashSpriteSheet;

let waterSound;
let pirateLaughSound;
let backgroundMusic;
let cannonExplosion;

let score = 0;
let isGameOver = false;
let isLaughing = false;

function preload (){
    backgroundImg = loadImage ("Assets/background.gif");
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
function keyPressed (){
    if (keyCode === DOWN_ARROW){
        let cannonBall = new CannonBall (cannon.x, cannon.y);
        cannonBall.trajectory = [];
        Matter.Body.setAngle (cannonBall.Body, cannon.angle);
        balls.push (cannonBall);
    }
}

function keyReleased (){
    if (keyCode === DOWN_ARROW && !isGameOver){
        cannonBall.shoot ()
    }
}

function showCannonBalls (ball, index){
    if (ball){
        ball.display ();
        ball.animate ();
        
        if (ball.body.position.x >= width || ball.body.position.y >= weight - 50){
            if (!ball.isSink){
                ball.remove (index);
            }
        }
    }
}