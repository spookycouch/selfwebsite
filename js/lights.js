//initial setup; get items from page.
var lightsOn = true;
var lightBorders = document.getElementsByClassName("lightBorder");
var lightButtons = document.getElementsByClassName("lights");
var tableHeadings = document.getElementsByClassName("tableHeadings");
function triggerLights()
{
	//if the lights are on, turn them off by setting darker backgrounds and lighter foregrounds
	//text for all buttons are swapped, anchors and borders changed individually
	if(lightsOn)
	{
		document.getElementsByClassName("blog")[0].style.background = "#111";
		document.getElementsByTagName("main")[0].style.background = "#000";
		document.getElementsByTagName("main")[0].style.color = "#FFF";
		for(var count = 0; count< lightBorders.length; count++)
				lightBorders[count].style.border = "none";	
		for(var count = 0; count< tableHeadings.length; count++)
				tableHeadings[count].style.background = "#000";		
		for(var count = 0; count < lightButtons.length; count++)
				lightButtons[count].textContent = "Low-light mode: on"; //Turn on the lights
	}
	else
	{
		//otherwise if lights are off, set lighter backgrounds and darker foregrounds
		//swap button texts
		document.getElementsByClassName("blog")[0].style.background = null;
		document.getElementsByTagName("main")[0].style.background = null;
		document.getElementsByTagName("main")[0].style.color = null;
		for(var count = 0; count< lightBorders.length; count++)
				lightBorders[count].style.border = null;
		for(var count = 0; count< tableHeadings.length; count++)
				tableHeadings[count].style.background = null;	
		for(var count = 0; count < lightButtons.length; count++)
				lightButtons[count].textContent = "Low-light mode: off";
	}
	//state of lights are toggled
	lightsOn = !lightsOn;
}