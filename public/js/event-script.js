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
		description: document.getElementById('event-description').value,
		location: document.getElementById('event-location').value,
		time: document.getElementById('event-time').value
	}

	const jsonData = JSON.stringify(eventObj);

	var xhr = new XMLHttpeRequest();
	xhr.open('POST', '/events', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(jsonData);
}