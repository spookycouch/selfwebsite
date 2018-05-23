//FILTERS. To add filter, add new class="filterCheck" to html, and a string of [category name] to array "catNames" below in the same order of appearance.
var allItems = document.getElementsByClassName("gridItem");
var videos = document.getElementsByTagName("video");
var audio = document.getElementsByTagName("audio");
var catNames = ["gameDesign", "animation", "art", "music"]; //add new checkboxes here

var currItems = allItems;
var currCount;
//set the [ count ] on the menu for each category
var catCount = document.getElementsByClassName("catCount");
for(var count= 0; count < catCount.length; count++)
	catCount[count].textContent = document.getElementsByClassName(catNames[count]).length;


/** Checkboxes, names and booleans stored in arrays. Order as follows:
0 - Game Design
1 - Animation
2 - Art
3 - Music
**/
var checkbox = document.getElementsByClassName("filterCheck");	
//each checkbox is given a name from the catNames list and a boolean representing whether it is checked.
for(var count = 0; count < checkbox.length; count++)
{
	checkbox[count].catName = catNames[count];
	checkbox[count].checkBoolean = false;
}
//setup each checkbox to toggle respective booleans on change and call the display function
for (var count = 0; count < checkbox.length; count++)
	checkbox[count].onchange = function() { this.checkBoolean = !this.checkBoolean; displayItems(); };

//FUNCTIONS

function displayItems()
{
	//if at least one of the boxes are checked;
	if(checkAllBooleans())
	{
		currCount = 0;
		//set all items to display none
		for (var count= 0;count < allItems.length; count++)
			allItems[count].style.display = "none";
		//shows individual category with showCategory function if a checkbox is checked
		for (var count = 0; count< checkbox.length; count++)
			if(checkbox[count].checkBoolean) showCategory(checkbox[count].catName);
	}
	//otherwise return all items to default display
	else
	{	
		currItems = allItems;
		for (var count= 0;count < allItems.length; count++)
			allItems[count].style.display = null;
	}
	//pause all video and audio
	for (var count = 0; count < videos.length; count++)
		videos[count].pause();
	for (var count=0; count < audio.length; count++)
		audio[count].pause();
}
function showCategory(classIn)
{
	//get all elements of a class and set their display to none
	itemShow = document.getElementsByClassName(classIn);
	for (var count=0; count < itemShow.length; count++)
	{
		itemShow[count].style.display = null;
		console.log(itemShow[count]);
		currItems[currCount] = itemShow[count];
		console.log(currItems[currCount]);
	}
}
function checkAllBooleans()
{
	//returns true if at least one checkbox is activated, otherwise returns false
	for (var count = 0; count < checkbox.length; count++)
		if(checkbox[count].checkBoolean)
			return true;
	return false;
}