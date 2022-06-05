const init = function(){
	var popup = document.createElement('iframe');
	console.log("test1:");
	popup.src = chrome.runtime.getURL('pop.html');
	popup.setAttribute("id","pop");
    popup.style.cssText = 'position:fixed;top:10;left:10;display:block;' +
                           'width:300px;height:10%;z-index:1000;background-color: white;';
	popup.style.visibility = "hidden";
	console.log("hiding popup");

	document.body.appendChild(popup);
	
	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
		console.log("cs received");
		if(message == "hide"){
		document.getElementById("pop").style.visibility = "hidden";
		}
		if (message =="show")
		document.getElementById("pop").style.visibility = "visible";
		}
	});
	//popup.addEventListener('load',()=>{
	//	console.log('test:');
	//	console.log(popup,popup.contentWindow.document, popup.contentWindow.document.querySelector("button"));
	//	popup.contentDocument.getElementById("button").addEventListener('click', ()=>{
	//		alert('test');
	//	});
	//})

}

init();