console.log('Clientside Javascript Loaded!')

window.addEventListener('load', init())
document.forms["event-creation"].addEventListener('submit', (event) => createEvent(event))

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

function createEvent(event){
	event.preventDefault()

	const eventObj = {
		name: document.forms['event-creation']['event-name'].value,
		description: document.forms['event-creation']['event-description'].value,
		location: document.forms['event-creation']['event-location'].value,
		time: document.forms['event-creation']['event-time'].value
	}

	const createEventError = document.getElementById('create-event-error')
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/events', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify(eventObj));
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                alert('[SERVER-TEST] Event Creation Successful!')
                // window.location.replace('/')
            }
            else if (this.status === 400) {
				console.log(response)
                showAppropriateTextCreateEvent(response, createEventError)
            }
        }
    }
}

const showAppropriateTextCreateEvent = (response, createEventError) => {
    showText(createEventError, 'Something went wrong.')
}


const showText = (element, text) => {
    element.textContent = text
    element.classList.remove('hidden')
}

