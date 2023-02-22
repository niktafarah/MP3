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


// Initialize some params
let ballSize = 60;
let ballX = 100; 
let ballY = 599; 

let finalScore = 0;
let scoreSize = 32;

function setup() {
    new Canvas(windowWidth, windowHeight);
    world.gravity.y = 2;
    setupBounds();
    setupBall();
    setupFloor();
    // setupShadow();
    // shadow.overlaps(floor);
    setupNet();
    netSign();
    ball.overlaps(net);
    setupNetBounds();
    setupNetB2();
}

function draw() {
	clear();
    if (mouse.presses()) {
        ball.moveTo(mouse, 8);
    }
    if (kb.presses('space')) {
        win.remove();
        finalScore = 0;
    }

    if (ball.collides(netbound2)) {
        ball.pos = {x:ballX, y:ballY};
    }

    // if (ball.collided(floor)) {
    //     ball.remove();
    // };

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

    if (ball.overlaps(netsign)) {
        finalScore = finalScore + 10;
        if (finalScore == 50) {
            win();
        }
    }
  }


function setupBall() {
    ball = new Sprite();
    ball.color = colors.orange;
    ball.diameter = ballSize;
    ball.bounciness = 0.4;
    ball.speed = 10;
    ball.pos = {x:ballX, y:ballY};
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
    floor.h = 100;
    floor.collider = 'static';
}



function netSign() {
    netsign = new Sprite ();
    netsign.color = colors.yellow;
    netsign.w = 196;
    netsign.h = 1;
    netsign.pos = {x:windowWidth, y:windowHeight/3};
    netsign.collider = 'static';
    netsign.visible = false;
}

function setupNet() {
    net = new Sprite ();
    net.color = colors.grey;
    net.w = 200;
    net.h = 10;
    net.pos = {x:windowWidth, y:windowHeight/3};
    net.collider = 'static';
}



function setupNetBounds() {
    netbound = new Sprite ();
    netbound.pos = {x:windowWidth-100,y:windowHeight/2+50};
    netbound.h = windowHeight/2;
    netbound.w = 2;
    noStroke();
    netbound.visible = false;
    netbound.collider = 'static';
}

function setupNetB2() {
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


// import { Sprite } from "three";

// import {
//     BoxGeometry,
//     Mesh,
//     MeshPhongMaterial,
//     PerspectiveCamera,
//     Scene,
//     WebGLRenderer,
//     DirectionalLight,
//   } from "three";
  
//   // Create our scene
//   const scene = new Scene();
  
//   // Create the camera so we can see our scene
//   const camera = new PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
  
//   // Create our renderer and add it to the DOM
//   const renderer = new WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);
  
//   // Create our cube mesh from  a geometry and a material and add it to the scene
//   const geometry = new BoxGeometry(1, 1, 1);
//   const material = new MeshPhongMaterial({ color: 0x00ff00 });
//   const cube = new Mesh(geometry, material);
//   scene.add(cube);
  
//   // Add a directional light so we can see shadows on the cube
//   const color = 0xffffff;
//   const intensity = 1;
//   const light = new DirectionalLight(color, intensity);
//   light.position.set(-1, 2, 4);
//   scene.add(light);
  
//   // Position the camera
//   camera.position.z = 5;
  
//   // The animation loop updates the cube's rotation
//   function animate() {
//     requestAnimationFrame(animate);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     renderer.render(scene, camera);
//   }
  
//   // Start the animation loop
//   animate();
  
// Declare sprite variables
