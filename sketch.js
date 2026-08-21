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
    boatSpriteData = loadJSON ("Assets/boat.json");
    boatSpriteSheet = loadImage ("Assets/boatOne.png");
    brokenBoatSpriteData  = loadJSON ("Assets/broken_boat.json");
    brokenBoatSpriteSheet = loadImage ("Assets/broken-boat.png");
    waterSplashSpriteData = loadJSON ("Assets/water_splash.json");
    waterSplashSpriteSheet = loadImage ("Assets/water-splash.png");

    backgroundMusic = loadSound ("Assets/background_music.mp3");
    cannonExplosion = loadSound ("Assets/cannon_explosion.mp3");
    waterSound = loadSound ("Assets/cannon_water.mp3");
    pirateLaughSound = loadSound ("Assets/pirate_laugh.mp3");
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

    let boatFrames = boatSpriteData.frames;
    for (let i = 0; i < boatFrames.length; i++) {
        let pos = boatFrames [i].position;
        let img = boatSpriteSheet.get (pos.x, pos.y, pos.w, pos.h);

        boatAnimation.push (img);
    }

    let brokenBoatFrames = brokenBoatSpriteData.frames;
    for (let i = 0; i < brokenBoatFrames.length; i++) {
        let pos = brokenBoatFrames [i].position;
        let img = brokenBoatSpriteSheet.get (pos.x, pos.y, pos.w, pos.h);

        brokenBoatAnimation.push (img);
    }

    let waterSplashFrames = waterSplashSpriteData.frames;
    for (let i = 0; i < waterSplashFrames.length; i++) {
        let pos = waterSplashFrames [i].position;
        let img = waterSplashSpriteSheet.get (pos.x, pos.y, pos.w, pos.h);

        waterSplashAnimation.push (img);
    }
}

function draw (){
    image (backgroundImg, 0, 0, 1200, 600);

    if (!backgroundMusic.isPlaying ()) {
        backgroundMusic.play ();
        backgroundMusic.setVolume (0.1);
    }

    Engine.update (engine);

    ground.display ();
    showBoats ();
    for (let i = 0; i < balls.length; i++) {
        showCannonBalls (balls [i], i);

        for (let j = 0; j < boats.length; j++) {
            if (balls [i] !== undefined && boats [j] !== undefined) {
                let collision = Matter.SAT.colides (balls [i].body, boats [j].body);
            }
        }
        
    }
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