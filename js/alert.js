const start = function(){
	
}
const setUpListen = function(){
	button = document.getElementById("button");
	console.log(document.getElementById("button"));
	console.log(button);
	button.addEventListener("click", isPressed);
}

function isPressed(e){
	chrome.runtime.sendMessage("test");	
}

window.addEventListener("load", setUpListen);
