function writeIntoElement(element, text) {
	if(document.all){
	     document.getElementById(element).innerText = text;
	} else{
	    document.getElementById(element).textContent = text;
	}
}

function writeIntoElementHTML(element, text) {
	if(document.all){
	     document.getElementById(element).innerHTML = text;
	} else{
	    document.getElementById(element).textContent = text;
	}
}

var debugText = [];
var debugHistory = 15;

function debug(debugString) {
	if (debugText.length>debugHistory) {
		debugText.shift();
	}
	
	dateString = formatTime(new Date());
	
	debugText.push(String(dateString + " : " + debugString));
	
	debugHTML = "";
	for (i in debugText) {
		debugHTML+= debugText[i] + "<br/>";		
	}
	
	$('#debugPanel').html(debugHTML);
}

function formatTime(date) {
	var hours;
	var minutes;
	var seconds;
	var millis;
	var timeString;
	
	hours = date.getHours();
 	minutes = date.getMinutes();
	seconds = date.getSeconds();
	millis = date.getMilliseconds();
	
	if (hours<10) hours = "0" + hours;
	if (seconds<10) seconds = "0" + seconds;
	if (minutes<10) minutes = "0" + minutes;
	if (millis<100) millis = "0" + millis;
	if (millis<10) millis = "0" + millis;
	
	timeString = hours + ":" + minutes + ":" + seconds + "." + millis;
	return timeString;
}