/**
*** Jeffcock web project
*** js written May 2018
**/
//variables for table of contents menu
var tocBtn = document.getElementById("tocButton");
var dropToc = document.getElementById("dropToc");
var arrow = document.getElementById("arrow");
var dropTocDown = false;

//calls functions when clicked
document.getElementById("tocButton").onclick = tocAppear;

//drop-down function of menu
function tocAppear()
{
	//if menu down, return to default. otherwise, go to 50px below top of window
	if(dropTocDown)
	{
		arrow.textContent = '\u25bc';
		tocBtn.style.background = null;
		dropToc.style.transform = null;
		dropTocDown = false;
	}
	else
	{
		arrow.textContent = '\u25b2';
		tocBtn.style.background = "#2c9c91";
		dropToc.style.transform = "translateY(50px)";
		dropTocDown = true;
	}
}


//variables for hamburger menu
var hamburgMenu = document.getElementById("navButtons");
var screen = document.getElementById("screen");
var hamburgDown = false;
document.getElementById("hamburger").onclick = menuAppear;
document.getElementById("hamburger2").onclick = menuAppear;

//function for hamburger menu, similar to TOC function above
function menuAppear()
{
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
		//close the table of contents when opened
		arrow.textContent = '\u25bc';
		tocBtn.style.background = null;
		dropToc.style.transform = null;
		dropTocDown = false;
		//dark screen appears
		screen.style.opacity = "0.5";
		screen.style.visibility = "visible";
	}
}


//close menus when clicked outside; reset styles to default
//click on main
document.getElementsByTagName("main")[0].onmousedown = function()
{
	//arrow direction is swapped
	arrow.textContent = '\u25bc';
	tocBtn.style.background = null;
	dropToc.style.transform = null;
	dropTocDown = false;
	
};
//click on screen
screen.onmousedown = function()
{
	screen.style.opacity = "0";
	screen.style.visibility = "hidden";
	hamburgMenu.style.transform = null;
	hamburgDown = false;
}