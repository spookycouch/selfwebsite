//Tutorial Examples. Javascript closely resembles Java code in tutorial for any in-depth explanations.
//Comments used for sectorisation and highlighting any specific differences in code
//SETUP
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");
var canvas4 = document.getElementById("canvas4");
var canvas5 = document.getElementById("canvas5");
//buttons
var btnLeft = document.getElementById("buttonLeft");
var btnRight = document.getElementById("buttonRight");
var btnLeft2 = document.getElementById("buttonLeft2");
var btnRight2 = document.getElementById("buttonRight2");

//chapter 2; draws line and square
var g2d = canvas2.getContext("2d");
g2d.fillStyle = "#FFF";
g2d.fillRect(0,0,640,480);
g2d.fillStyle = "#000";
g2d.fillRect(200,200,50,50);
g2d.moveTo(50,50);
g2d.lineTo(200,400);
g2d.stroke();

//chapter 3
var canvas3x = 0;
g2d = canvas3.getContext("2d");
g2d.fillStyle = "#FFF";
g2d.fillRect(0,0,640,480);
g2d.fillStyle = "#000";

//chapter 4 mouse-inputs for speed
btnLeft.onmousedown = function(){ leftSpeed = -10; };
btnRight.onmousedown = function(){ rightSpeed = 10; };
btnLeft.onmouseup = function(){ leftSpeed = 0; };
btnRight.onmouseup = function(){ rightSpeed = 0; };
btnLeft.onmouseleave = function(){ leftSpeed = 0; };
btnRight.onmouseleave = function(){ rightSpeed = 0; };
document.getElementById("buttonReset").onmousedown = function(){ playerx= 300; };
//chapter 4 touch-inputs for speed 
btnLeft.ontouchstart = function(){ leftSpeed = -10};
btnRight.ontouchstart = function(){ rightSpeed = 10; };
btnLeft.ontouchend = function(){ leftSpeed = 0; };
btnRight.ontouchend = function(){ rightSpeed = 0; };

//chapter 4 & 5 player
var playerx = 300;
var leftSpeed = 0;
var rightSpeed = 0;

//chapter 5
var start;
var dead;
var enemyx;
var enemyy;
var enemySpeed;
resetChap5();
function resetChap5()
{
	start = false;
	dead = false;
	playerx = 300;
	enemyx = 290;
	enemyy = 0;
	enemySpeed = 10;
	g2d = canvas5.getContext("2d");
	g2d.fillStyle = "#FFF";
	g2d.fillRect(0,0,640,480);
	g2d.fillStyle = "#000";
	g2d.fillRect(playerx,400,20,20);
	g2d.fillStyle = "#CCC";
	g2d.fillRect(enemyx,enemyy,40,40);
}

//chapter 5 mouse-inputs for speed
btnLeft2.onmousedown = function(){ if(start) leftSpeed = -10; };
btnRight2.onmousedown = function(){ if(start) rightSpeed = 10; };
btnLeft2.onmouseup = function(){ leftSpeed = 0; };
btnRight2.onmouseup = function(){ rightSpeed = 0; };
btnLeft2.onmouseleave = function(){ leftSpeed = 0; };
btnRight2.onmouseleave = function(){ rightSpeed = 0; };
document.getElementById("buttonReset2").onmousedown = function(){ resetChap5(); };
document.getElementById("buttonStart2").onmousedown = function(){ if(!start || dead) { resetChap5(); start = true; } };
//chapter 5 touch-inputs for speed
btnLeft2.ontouchstart = function(){ leftSpeed = -10};
btnRight2.ontouchstart = function(){ rightSpeed = 10; };
btnLeft2.ontouchend = function(){ leftSpeed = 0; };
btnRight2.ontouchend = function(){ rightSpeed = 0; };

//chapters 4 & 5 event listener for keyboard-input
window.addEventListener('keydown', function(event)
{
	if(event.keyCode == 37)
		leftSpeed = -10;
	else if(event.keyCode == 39)
		rightSpeed = 10;
});
window.addEventListener('keyup', function(event)
{
	if(event.keyCode == 37)
		leftSpeed = 0;
	if(event.keyCode == 39)
		rightSpeed = 0;
});


//ANIMATION 
var timerCount = 0;
window.setInterval(paint,50); //call function paint every 500 milliseconds
function paint()
{
	//timerCount used when frameRate required is 10% of the interval set.
	//if timer count reaches 10 (500ms), code is carried out and the count is reset. Otherwise the count increases by 1.
	if(timerCount == 10)
	{
		//chapter 3
		//draw square at x and add to x
		g2d = canvas3.getContext("2d");
		g2d.fillRect(canvas3x,200,10,10);
		canvas3x += 10;
		//reset animation when x-coordinates are off-screen
		if(canvas3x == 650)
		{
			g2d.fillStyle = "#FFF";
			g2d.fillRect(0,0,640,480);
			g2d.fillStyle = "#000";
			canvas3x = 0;
		}
		timerCount = 0;
	}
	else
		timerCount ++;

	//Draw Canvas in Chapter 4
	//Code was designed to replicate that of the java tutorial; a refresh rate based on input could be implemented for performance using booleans.
	//speed from input above is added to x-coord, square is then drawn.
	playerx += leftSpeed + rightSpeed;
	g2d = canvas4.getContext("2d");
	g2d.fillStyle = "#FFF";
	g2d.fillRect(0,0,640,480);
	g2d.fillStyle = "#000";
	g2d.fillRect(playerx,200,20,20);

	//Draw Canvas in Chapter 5
	//uses playerx and speeds from chapter 4 to save memory
	if(start && !dead)
	{
		enemyy+=10;
		g2d = canvas5.getContext("2d");
		g2d.fillStyle = "#FFF";
		g2d.fillRect(0,0,640,480);
		g2d.fillStyle = "#000";
		g2d.fillRect(playerx,400,20,20);
		g2d.fillStyle = "#CCC";
		g2d.fillRect(enemyx,enemyy,40,40);
		if(420>enemyy && 360<enemyy && playerx+20>enemyx && playerx<enemyx+40)
			dead = true;
		else if(enemyy == 480)
		{
			enemyy = -40;
			enemyx = Math.random()*640;
		}
	}
}