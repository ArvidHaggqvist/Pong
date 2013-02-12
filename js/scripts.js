/**
 * Pong for two players in HTML5 canvas
 *
 * Written by Arvid Häggqvist
 * arvidhaggqvist.com
 * Feel free to use the code here in whatever way you like without any required attribution

 * Play the game at arvidhaggqvist.com/pong/
 */


var canvas	= document.getElementById('canvas'),
	ctx		= canvas.getContext('2d');

// Ball vars
var x = 400, y = 20, incX = 5, incY = 2, extraspeed = 0;

// Paddle vars
var leftx = 0, lefty = 100, leftw = 15, lefth = 100;
var rightx = 785, righty = 100, rightw = 15, righth = 100;

// Control vars
var arrowUp = false, arrowDown = false;
var wUp = false, sUp = false;

// Points vars & endgame
var p1 = 0, p2 = 0, intervalId;

// Draw loop
function draw() {
	clearCanvas();
	ctx.fillStyle = 'white';
	ctx.fillRect(x,y,10,10);

	// If the ball hits the wall or the floor, reverse it
	if(y>350 || y<0) {
		incY = -incY;
	}
	if(x > 800) {
		p1 += 1;
		incX = -incX;
		respawn();
	}
	if(x < 0) {
		p2 += 1;
		incX = -incX;
		respawn();
	}
	// Init the left paddle
	leftPaddle();

	// Check if left paddle is hit
	if(x + incX < 20 && y > lefty && y < lefty + 100 ) {
		incX = -incX;
		// If the ball hits the edge of the paddle, increase the speed
		if(y<=lefty + 25 && x>0 || y>=lefty + 75 && x>0) {
			extraspeed = 2;
		}
		else {
			extraspeed = 0;
		}
	}

	// Init the right paddle
	rightPaddle();

	// Check if the right paddle is hit
	if(x + incX > 780 && y > righty && y < righty + 100 ) {
		incX = -incX;
		// If the ball hits the edge of the paddle, increase the speed
		if(y<=righty + 25 && x<800 || y>=righty + 75 && x<800) {
			extraspeed = -2;
		}
		else {
			extraspeed = 0;
		}
	}

	// Display scores
	ctx.font = '20px helvetica';
	ctx.fillText(p1, 100, 50);
	ctx.fillText(p2, 700, 50);

	// Victory conditionals
	if(p1 > 10) {
		clearInterval(intervalId);
		clearCanvas();
		ctx.fillText('Player one wins!', 400, 150);
	}
	if(p2 > 10) {
		clearInterval(intervalId);
		clearCanvas();
		ctx.fillText('Player two wins!', 400, 150);
	}

	x += incX + extraspeed;
	y += incY;

}
// Paddles
function leftPaddle() {
	ctx.fillRect(leftx, lefty, leftw, lefth);

	if(wUp === true) {
		lefty += -4;
	}
	if(sUp === true) {
		lefty += 4;
	}
	
}
function rightPaddle() {
	ctx.fillRect(rightx, righty, rightw, righth);

	if(arrowUp === true) {
		righty += -4;
	}
	if(arrowDown === true) {
		righty += 4;
	}
}

// Event listeners
addEventListener("keydown", function(e) {
	if(e.keyCode === 38) {
		arrowUp = true;
	}
	if(e.keyCode === 40) {
		arrowDown = true;
	}
	if(e.keyCode === 87) {
		wUp = true;
	}
	if(e.keyCode === 83) {
		sUp = true;
	}
}, false);

addEventListener("keyup", function(e) {
	if(e.keyCode === 38) {
		arrowUp = false;
	}
	if(e.keyCode === 40) {
		arrowDown = false;
	}
	if(e.keyCode === 87) {
		wUp = false;
	}
	if(e.keyCode === 83) {
		sUp = false;
	}
}, false);

// Respawn ball
function respawn() {
	x = 400;
	extraspeed = 0;
}

// Clear canvas function to clear the entire canvas between the new draw starts
function clearCanvas() {
	ctx.clearRect(0,0,800,350);
}

// Start the loop
function init() {
	intervalId = setInterval(draw,7.5);
}
// Initialize the loop when link is clicked
var startIsClicked = document.getElementById('start').addEventListener('click', init, false);

// Sound
document.getElementById('audio').addEventListener('ended', function(){
    this.currentTime = 0;
}, false);