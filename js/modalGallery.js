/**
*** Jeffcock web project
*** js written April 2018
**/
//FILTERS. To add filter, add new class="filterCheck" to html, and a string of [category name] to array "catNames" below in the same order of appearance.
var allItems = document.getElementsByClassName("gridItem");
var videos = document.getElementsByTagName("video");
var audio = document.getElementsByTagName("audio");
var catNames = ["gameDesign", "animation", "art", "music"]; //add new checkboxes here
var currentItems = document.getElementsByClassName("gridItem");
var currCount;
//gives the items a running order
for(var count = 0; count < currentItems.length; count++)
	currentItems[count].order = count;
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
//initial state
displayItems();
updateItems();

//FUNCTIONS
function displayItems()
{
	//pause all video and audio
	for (var count = 0; count < videos.length; count++)
		videos[count].pause();
	for (var count=0; count < audio.length; count++)
		audio[count].pause();
	//if at least one of the boxes are checked;
	if(checkAllBooleans())
	{
		currCount = 0;
		currentItems = [];
		//set all items to display none
		for (var count= 0;count < allItems.length; count++)
			allItems[count].style.display = "none";
		//shows individual category with showCategory function if a checkbox is checked
		for (var count = 0; count< checkbox.length; count++)
			if(checkbox[count].checkBoolean) showCategory(checkbox[count].catName);
		//simple sort to make sure grid items and id are in the correct order
		for (var count = 0; count < currentItems.length - 1; count++)
		{
			if(currentItems[count].order > currentItems[count + 1].order)
			{
				var tempItem = currentItems[count];
				var tempItemId = currentItems[count].id;
				currentItems[count].id = currentItems[count + 1].id;
				currentItems[count + 1].id = tempItemId;
				currentItems[count] = currentItems[count + 1];
				currentItems[count + 1] = tempItem;
			}
		}
	}
	//otherwise return all items to default display
	else
	{	
		currentItems = document.getElementsByClassName("gridItem");
		for (var count= 0;count < currentItems.length; count++)
		{
			currentItems[count].style.display = null;
			currentItems[count].id = count;
		}
	}
	updateItems(); //update click and hover functions for all items
}
function showCategory(classIn)
{
	//get all elements of a class and set their display to none
	itemShow = document.getElementsByClassName(classIn);
	for (var count=0; count < itemShow.length; count++)
	{
		itemShow[count].style.display = null;
		currentItems.push(itemShow[count]);
		currentItems[currCount].id = currCount;
		currCount++;
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


/** MODAL GALLERY **/
//VARIABLES
var modal = document.getElementById("modal");
var modalImage = document.getElementById("modalImage");
var modalVideo = document.getElementById("modalVideo");
var modalAudio = document.getElementById("modalAudio");
var modalTitle = document.querySelectorAll("#modalText h4")[0];
var modalText = document.querySelectorAll("#modalText span")[0];
var currentId = 0;

//BUTTONS
//set close function for modal image
document.getElementById("closeModal").onmousedown = function(){ closeAll(); }; 
document.getElementById("exitButton").onmousedown = function(){ closeAll(); }; 
//set function for modal buttons
document.getElementById("nextImgBtn").onclick = function() { nextImage(1); };
document.getElementById("modalImage").onclick = function() { nextImage(1); };
document.getElementById("modalVideo").onclick = function() { nextImage(1); };
document.getElementById("modalAudio").onclick = function() { nextImage(1); };
document.getElementById("prevImgBtn").onclick = function() { nextImage(-1); };

//FUNCTIONS
//set the mouse functions and id for each grid item
//click displays modal, hover lights up, and id's are assigned incrementally
function updateItems()
{
	for (var count = 0; count < currentItems.length; count++)
	{
		currImage = currentItems[count].getElementsByClassName("imageContainer")[0];
		currImage.onclick = function(){ displayModal(this.parentElement); };
		currImage.onmouseenter = function(){ lightUp(this); };
	}
}
//sets all items to display none and pauses any audio or video
function closeAll()
{
	modalImage.style.display = "none";
	modalVideo.style.display = "none";
	modalAudio.style.display = "none";
	modalVideo.pause();
	modalAudio.pause();
	modal.style.display = "none";
}
//sets modal image/video/audio depending on type of media in grid item.
//then sets the media and modal display to be visible. video and audio will be paused.
function displayModal(mediaIn)
{
	currentId = (mediaIn.id);
	if(mediaIn.getElementsByTagName("img").length > 0)
	{
		modalImage.src = mediaIn.getElementsByTagName("img")[0].src;
		modalImage.style.display = "inline-block";
	}
	else if(mediaIn.getElementsByTagName("video").length > 0)
	{
		mediaIn.getElementsByTagName("video")[0].pause();
		modalVideo.src = mediaIn.getElementsByTagName("video")[0].src;
		modalVideo.style.display = "inline-block";
	}
	else if(mediaIn.getElementsByTagName("audio").length > 0)
	{
		mediaIn.getElementsByTagName("audio")[0].pause();
		modalAudio.src = mediaIn.getElementsByTagName("audio")[0].src;
		modalAudio.style.display = "inline-block";
	}
	modal.style.display = "flex";
	/** sets the modal text and counter **/
	modalTitle.textContent = mediaIn.getElementsByTagName("h3")[0].textContent;
	modalText.textContent = mediaIn.getElementsByTagName("span")[0].textContent;
	document.getElementById("imageCounter").textContent = parseInt(currentId) + 1 + "/" + currentItems.length;
}
//closes all to refresh, then checks if the user has passed the first or last images in the list
//modal number is then set and displayed.
function nextImage(numberIn)
{
	closeAll(); 
	var tempId = numberIn + parseInt(currentId);
	if(tempId ==currentItems.length)
		tempId = 0;
	else if(tempId == -1)
		tempId = currentItems.length - 1;
	displayModal(currentItems[tempId]);
}

//LIGHT UP AND LOOP
//sets a grid item to be "lit up" when mouse hovers.
//previously lit item will be dimmed (opacity = null) and the new one will be set to light up.
var litItem = currentItems[0];
function lightUp(gridContainerIn)
{
	litItem.style.opacity = null;
	litItem = gridContainerIn;
	litItem.style.opacity = "1";
}
//gets all the items set to loop on the page and changes the video settings to loop. 
//chrome update of april 2018 requires videos to be muted to autoplay.
var loopItems = document.getElementsByClassName("loop");
for (var count = 0; count < loopItems.length; count++)
{
	loopItems[count].muted = true;
	loopItems[count].loop = true;
	loopItems[count].play();
}