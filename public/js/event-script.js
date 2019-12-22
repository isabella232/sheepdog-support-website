console.log('Event scrpit loaded!')

function init() {
	var coll = document.getElementsByClassName("collapsible");
	var i;
	console.log(coll.length)
	for (i = 0; i < coll.length; i++) {
	  	coll[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content.style.maxHeight){
			content.style.maxHeight = null;
			} else {
			content.style.maxHeight = content.scrollHeight + "px";
			}
	  	});
	}
}

document.forms["event-creation"].addEventListener('submit', (event)=> createEvent(event))

function createEvent(event){
	event.preventDefault()

	const eventObj = {
		description: document.forms['event-creation']['event-description'].value,
		location: document.forms['event-creation']['event-location'].value,
		time: document.forms['event-creation']['event-time'].value
	}

	const jsonData = JSON.stringify(eventObj);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/events', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(jsonData);
}