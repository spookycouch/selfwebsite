/**
*** Jeffcock web project
*** js written April 2018
**/
//variables for hamburger menu
var hamburgMenu = document.getElementById("navButtons");
var screen = document.getElementById("screen");
var hamburgDown = false;
document.getElementById("hamburger").onclick = menuAppear;
document.getElementById("hamburger2").onclick = menuAppear;

//function for hamburger menu, similar to TOC function above
function menuAppear()
{
	//if menu is out, return to default. otherwise appear from right side of screen
	if(hamburgDown)
	{
		hamburgMenu.style.transform = null;
		hamburgDown = false;
		screen.style.opacity = "0";
		screen.style.visibility = "hidden";
	}
	else
	{
		hamburgMenu.style.transform = "translateX(-100%)";
		hamburgDown = true;
		//dark screen appears
		screen.style.opacity = "0.5";
		screen.style.visibility = "visible";
	}
}


//close menus when clicked outside; reset styles to default
//click on screen
screen.onmousedown = function()
{
	screen.style.opacity = "0";
	screen.style.visibility = "hidden";
	hamburgMenu.style.transform = null;
	hamburgDown = false;
}