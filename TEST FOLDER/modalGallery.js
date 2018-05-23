//set up of items needed
var gridContainer = document.getElementsByClassName("imageContainer");

var modal = document.getElementById("modal");
var modalImage = document.getElementById("modalImage");
var modalVideo = document.getElementById("modalVideo");
var modalAudio = document.getElementById("modalAudio");
var modalTitle = document.querySelectorAll("#modalText h4")[0];
var modalText = document.querySelectorAll("#modalText span")[0];
var currentId = 0;

//set the mouse functions and id for each grid item
//click displays modal, hover lights up, and id's are assigned incrementally
for (var count = 0; count < gridContainer.length; count++)
{
	gridContainer[count].onclick = function(){ displayModal(this); };
	gridContainer[count].onmouseenter = function(){ lightUp(this); };
	gridContainer[count].id = count;
}
//set close function for modal image
document.getElementById("closeModal").onmousedown = function(){ closeAll(); }; 
document.getElementById("exitButton").onmousedown = function(){ closeAll(); }; 
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
	modalTitle.textContent = mediaIn.parentElement.getElementsByTagName("h3")[0].textContent;
	modalText.textContent = mediaIn.parentElement.getElementsByTagName("span")[0].textContent;
	document.getElementById("imageCounter").textContent = parseInt(currentId) + 1 + "/" + document.getElementsByClassName("gridItem").length;
}
//set function for next gridItem
document.getElementById("nextImgBtn").onclick = function() { nextImage(1); };
document.getElementById("modalImage").onclick = function() { nextImage(1); };
document.getElementById("modalVideo").onclick = function() { nextImage(1); };
document.getElementById("modalAudio").onclick = function() { nextImage(1); };
document.getElementById("prevImgBtn").onclick = function() { nextImage(-1); };
//closes all to refresh, then checks if the user has passed the first or last images in the list
//modal number is then set and displayed.
function nextImage(numberIn)
{
	closeAll(); 
	var tempId = numberIn + parseInt(currentId);
	if(tempId == gridContainer.length)
		tempId = 0;
	else if(tempId == -1)
		tempId = gridContainer.length - 1;
	displayModal(gridContainer[tempId]);
}

//sets a grid item to be "lit up" when mouse hovers.
//previously lit item will be dimmed (opacity = null) and the new one will be set to light up.
var litItem = gridContainer[0];
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