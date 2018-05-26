//CAROUSEL. maximum slides is set to the number of buttons
//To change no. of slides, a new button must be added in .carouselButtons in html, with a new onmousedown function set below
//defaults and setup
var carousel = document.getElementById("carouselSlides");
var slideCounter = document.getElementById("slideCounter");
var maxSlides = document.querySelectorAll(".carouselButtons li").length;
var currentItem = 0;
var slideCoord = 0;
var placeInfront = false;
setSlides();
//sets up button presses
var buttonPressed = false;
//each button goes to a specific slide in sequence
document.getElementById("cButton1").onmousedown = function(){ goToSlide(0); };
document.getElementById("cButton2").onmousedown = function(){ goToSlide(1); };
document.getElementById("cButton3").onmousedown = function(){ goToSlide(2); };
//goes to slide based on button clicked (slideIn)
function goToSlide(slideIn)
{
	buttonPressed = true;
	placeInfront = false;
	if(!(currentItem == maxSlides && slideIn == 0)) //current item is changed as long as user hasn't called first slide on the last, identical one that seals the loop
		currentItem = slideIn;
	//resets the timer so the timer doesn't go off half-way/too early
	clearInterval(timer);
	timer = setInterval(nextSlide, 5000);
	nextSlide();
}

var timer = window.setInterval(nextSlide, 5000); //starts a timer to change slides automatically w/o user intervention

function nextSlide()
{
	//changes are applied in a buffer-like manner, where all changes are applied at once
	//as such, timer will alternate between placing slides in front and going to the next slide
	if(placeInfront)
	{
		if(currentItem == maxSlides)//if the timer calls to check reset and currentItem is at maximum, the slideshow is reset
		{
			currentItem = 0;
			carousel.style.transition = "none"; //transition is set to none so slides appear at rather than ease-into to new location
			//starting coordinate is set to zero and function is called.
			slideCoord = 0;
			setSlides();
		}
	}
	else //if timer/user calls to change slide
	{
		if(!buttonPressed)//if button isn't pressed, next slide
			currentItem++;
		carousel.style.transition = null; //transition is set to animate
		slideCoord = (currentItem * (-100)); //new starting coordinate is calculated
		setSlides();
	}
	//toggles timer and resets button
	buttonPressed = false;
	placeInfront = !placeInfront;
}
function setSlides()
{
	//Sets the counter on the top right. If current item is at maximum, set the counter to 1
	//Otherwise, set the counter to the index no.
	if(currentItem == maxSlides)
		slideCounter.textContent = "1/" + maxSlides;
	else
		slideCounter.textContent = (currentItem + 1) + "/" + maxSlides;
	//carousel coordinates set to slideCoord value. transition set in css animates this movement
	carousel.style.left = (slideCoord + "%");
}