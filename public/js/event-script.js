console.log('Clientside Javascript Loaded!')

document.forms["event-create"].addEventListener('submit', (event) => createEvent(event))
document.addEventListener('keydown', keyToggleCreateEvent)
document.getElementById('create-event-close').onclick = toggleCreateEvent
document.getElementById('create-event-open').onclick = toggleCreateEvent
document.querySelectorAll('.collapsible').forEach(elem => elem.addEventListener('click', toggleContent))

function createEvent(event){
	event.preventDefault()

	const eventObj = {
		name: document.forms['event-create']['event-name'].value,
		time: document.forms['event-create']['event-time'].value,
		location: document.forms['event-create']['event-location'].value,
		description: document.forms['event-create']['event-description'].value
	}

	const createEventError = document.getElementById('create-event-error')
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/events', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify(eventObj));
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            if (this.status === 201) {
                alert('Event Created!')
                window.location.replace('/events')
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

function toggleCreateEvent() {
	var popupWindow = this.closest('.popup-window') // not supported by opera mini
	if (!popupWindow) {
		popupWindow = document.querySelector('.popup-window') // may run into another .popup-window
	}

	popupWindow.classList.toggle('hidden-fadein-driver')
}

function keyToggleCreateEvent(e) {
	popupWindow = document.querySelector('.popup-window') // may run into another .popup-window
	if (e.key === 'Escape' && !popupWindow.classList.contains('hidden-fadein-driver')) {
		return popupWindow.classList.toggle('hidden-fadein-driver')
	}
}

function toggleContent() {
	this.classList.toggle("collapsible-not-active");

	var content = this.nextElementSibling;
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
	}
}

const showText = (element, text) => {
    element.textContent = text
    element.classList.remove('hidden')
}

