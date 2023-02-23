// import { Sprite } from "three";

// Declare some color constants
const colors = {
    red: "#BF616A",
    orange: "#D08770",
    yellow: "#EBCB8B",
    green: "#A3BE8C",
    blue: "#5E81AC",
    purple: "#B48EAD",
    grey: "#696969",
    darkgrey: "#5A5A5A",
    background: "#2E3440",
    foreground: "#ECEFF4",
  };

// Declare sprite variables
let walls;
let ball;
let shadow;
let net;
let netsign;
let netbound2;
let holder;
let netwall;
let randomnumX;
let randomnumY;


// Initialize some params
let ballSize = 60;
let ballX = 300; 
let ballY = 500; 

let finalScore = 0;
let scoreSize = 32;



function setup() {
    new Canvas(windowWidth, windowHeight);
    world.gravity.y = 10;
    setupBounds();
    setupBall();
    setupFloor();
    setupNet();
    overlap();
    randomizeX();
    randomizeY();
    soundFormats('mp3', 'ogg');
    swish = loadSound('swish.mp3');
    dribble = loadSound('dribble.mp3');
}


function draw() {
	clear();
    if (mouse.presses()) {
        ball.direction = ball.angleTo(mouse);
        ball.speed = 15;
        ball.overlaps(net);
        ball.overlaps(netsign);
    }
    if (kb.presses('space')) {
        win.remove();
        finalScore = 0;
    }

    if (ball.collides(netwall)) {
        ball.remove();
        setupBall();
    }

    if (ball.collides(floor)) {
        dribble.play();
    }

    if (ball.collides(walls)) {
        dribble.play();
    }
   
    drawScore();
}


function drawScore() {
    textAlign(RIGHT, TOP);
    textSize(scoreSize);
    let wordWidth = textWidth(finalScore);
    fill(colors.grey);
    rectMode(CORNERS);
    rect(width, 0, width - wordWidth - 20, scoreSize + 20, 20);
    fill(colors.foreground);
    text(finalScore, width - 10, 10);

    if (ball.overlaps(netbound2)) {
        finalScore = finalScore + 10;
        swish.play();
        ball.remove();
        setupBall();
        if (finalScore == 50) {
            win();
        }
    }
}

function human() {
    // Draw body and head of stick figure
  translate(100, 50);
  line(0, 25, 0, 60);
  ellipse(0, 15, 20, 20);
}

function randomizeX() {
    randomnumX = int(random(20,400));
    return randomnumX;
}

function randomizeY() {
    randomnumY = int(random(300,600));
    return randomnumY;
}

function setupBall() {
    ball = new Sprite();
    ball.color = colors.orange;
    ball.diameter = ballSize;
    ball.bounciness = 0.8;
    ball.speed = 30;
    ball.pos = {x:randomizeX(), y:randomizeY()};
    ball.sleeping = true;
    ball.mass = 20;
}

function overlap() {
    ball.overlaps(net);
}

function setupBounds() {
    walls = new Sprite(
      [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
        [0, 1],
      ],
      "static"
    );
    walls.color = colors.background;
  }

function setupFloor() {
    floor = new Sprite ();
    floor.color = colors.grey;
    floor.y = 600;
    floor.w = windowWidth;
    floor.h = windowHeight/4;
    floor.collider = 'static';
}

function setupNet() {
    net = new Sprite ();
    net.color = colors.grey;
    net.w = 200;
    net.h = 10;
    net.pos = {x:windowWidth, y:windowHeight/3};
    net.collider = 'static';

    netsign = new Sprite ();
    netsign.color = colors.yellow;
    netsign.w = 196;
    netsign.h = 1;
    netsign.pos = {x:windowWidth, y:windowHeight/3};
    netsign.collider = 'static';
    netsign.visible = false;

    netbound = new Sprite ();
    netbound.pos = {x:windowWidth-100,y:windowHeight/2+60};
    netbound.h = windowHeight/2;
    netbound.w = 2;
    noStroke();
    netbound.visible = false;
    netbound.collider = 'static';
    
    netwall = new Sprite ();
    netwall.pos = {x:windowWidth-105,y:windowHeight/2+40};
    netwall.h = windowHeight/2.5;
    netwall.w = 2;
    noStroke();
    netwall.visible = false;
    netwall.collider = 'static';

    netbound2 = new Sprite ();
    netbound2.pos = {x:windowWidth,y:windowHeight/2+30};
    netbound2.h = 2;
    netbound2.w = 200;
    noStroke();
    netbound2.visible = false;
    netbound2.collider = 'static';
}

function win() {
    win = new Sprite ();
    win.width = 700;
    win.height = 100;
    win.text = "You win! Click 'space' to play again.";
    win.collider = 'static';
    win.color = colors.foreground; 
}