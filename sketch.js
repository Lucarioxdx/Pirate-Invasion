const Engine = Matter.Engine;
const World  = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

let engine;
let world;
let canvas;
let backgroundImg;

function preload (){
    backgroundImg = loadImage ("assets/background.gif");
}

function setup (){
    canvas = createCanvas (1200, 600);
    engine = Engine.create();
    world = engine.world;
}

function draw (){
    image (backgroundImg, 0, 0, 1200, 600);
}