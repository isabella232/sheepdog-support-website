console.log('Client side JavaScript is loaded!')

/** Portal */
document.getElementById('user-info').onclick = toUserInfo
document.getElementById('button__edit-content-info').onclick = toggleUserInfo

document.getElementById('settings').onclick = toSettings
document.getElementById('button__edit-content-settings').onclick = toggleSettings

document.getElementById('my-events').onclick = toMyEvents

document.forms["event-create"].addEventListener('submit', (event) => createEvent(event))
document.addEventListener('keydown', keyToggleCreateEvent)
document.getElementById('create-event-close').onclick = toggleCreateEvent
document.getElementById('create-event-open').onclick = toggleCreateEvent

document.getElementById('button-logout').onclick = logout

function toMyEvents() {
    hideAllContents()
    document.getElementById('my-events-content').classList.remove('hidden-fadein-driver')
    document.getElementById('portal-current-select').style.top = '130px';
}
const hideAllContents = () => {
    document.querySelectorAll('.portal-content').forEach(elem => elem.classList.add('hidden-fadein-driver'))
}

/**
 * UserInfo
 */
function toUserInfo() {
    hideAllContents()
    document.getElementById('user-info-content').classList.remove('hidden-fadein-driver')
    document.getElementById('portal-current-select').style.top = '28px';
}
function toggleUserInfo() {
    icon = this.children[0]
    if (icon.classList.contains('fa-save')) {
        saveUserInfo(this)
    } else {
        toggleEditContent(this)
    }
}
/**
 * Save UserInfo
 */
const saveUserInfo = (inst) => {
    const userObj = createUserObj()
    if (!userObj) {
        return
    }
    // console.log('tInfo', userObj)

    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/account/portal')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(userObj))
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                
                registerUserObj(userObj, response)
                toggleEditContent(inst)
            } else {
                console.log(response)
            }
        }
    }
}
/**
 * Create UserObj
 */
function createUserObj() {
    const userObj = {}

    const fullname = document.getElementById('fullname').textContent.split(' ')
    if (document.forms['edit-content-info']['firstname'].value !== fullname[0]) {
        userObj.firstName = document.forms['edit-content-info']['firstname'].value
    }
    if (document.forms['edit-content-info']['lastname'].value !== fullname[1]) {
        userObj.lastName = document.forms['edit-content-info']['lastname'].value
    }
    if (document.forms['edit-content-info']['username'].value !== document.getElementById('username').textContent) {
        userObj.username = document.forms['edit-content-info']['username'].value
    }
    if (document.forms['edit-content-info']['biography'].value !== document.getElementById('biography').textContent) {
        if (document.forms['edit-content-info']['biography'].value !== '') {
            userObj.biography = document.forms['edit-content-info']['biography'].value
        }
    }
    if (document.forms['edit-content-info']['location'].value !== document.getElementById('location').textContent) {
        userObj.location = document.forms['edit-content-info']['location'].value
    }

    return userObj
}
/**
 * Register changes based off of changes on userobj
 */
function registerUserObj(userObj, response) {
    if (userObj.firstName || userObj.lastName) {
        document.getElementById('fullname').textContent = response.firstName + " " + response.lastName
    }
    if (userObj.username) {
        document.getElementById('username').textContent = response.username
    }
    if (userObj.biography) {
        if (response.biography !== '') {
            document.getElementById('biography').textContent = response.biography
        } else {
            document.getElementById('biography').textContent = 
                'Apparently, this user prefers to keep an air of mystery about them.'
        }
    }
    if (userObj.location) {
        document.getElementById('location').textContent = response.location
    }
}

/**
 * Settings
 */
function toSettings() {
    hideAllContents()
    document.getElementById('settings-content').classList.remove('hidden-fadein-driver')
    document.getElementById('portal-current-select').style.top = '79px';
}
function toggleSettings() {
    icon = this.children[0]
    if (icon.classList.contains('fa-save')) {
        saveSettings(this)
    } else {
        toggleEditContent(this)
    }
}
/**
 * Save Settings
 */
function saveSettings(inst) {
    const settObj = createSettObj()
    if (!settObj) {
        return
    }

    var xhr = new XMLHttpRequest()
    xhr.open('PATCH', '/account/portal')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(settObj))
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                registerSettObj(settObj, response)
                toggleEditContent(inst)
            } else {
                console.log(response)
            }
        }
    }
}
/**
 * Create SettObj
 */
function createSettObj() {
    const settObj = {}
    
    if (document.forms['edit-content-settings']['email'].value !== document.getElementById('email').textContent) {
        settObj.email = document.forms['edit-content-settings']['email'].value
    }
    if (document.forms['edit-content-settings']['newpassword'].value !== '') {
        settObj.password = document.forms['edit-content-settings']['newpassword'].value
    }
    if (document.forms['edit-content-settings']['emailonprof'].checked !== document.getElementById('emailonprof').checked) {
        settObj.emailOnProf = document.forms['edit-content-settings']['emailonprof'].checked
    }
    if (document.forms['edit-content-settings']['locationonprof'].checked !== document.getElementById('locationonprof').checked) {
        settObj.locationOnProf = document.forms['edit-content-settings']['locationonprof'].checked
    }
    if (document.forms['edit-content-settings']['subscribedeventsonprof'].checked !== document.getElementById('subscribedeventsonprof').checked) {
        settObj.subscribedEventsOnProf = document.forms['edit-content-settings']['subscribedeventsonprof'].checked
    }
    if (document.forms['edit-content-settings']['locationonvd'].checked !== document.getElementById('locationonvd').checked) {
        settObj.locationOnVD = document.forms['edit-content-settings']['locationonvd'].checked
    }

    return settObj
}
/**
 * Register changes based off of settObj 
 */
function registerSettObj(settObj, response) {
    if (settObj.email) {
        document.getElementById('email').textContent = response.email
    }
    if (settObj.emailOnProf !== undefined) {
        document.getElementById('emailonprof').checked = response.emailOnProf
    }
    if (settObj.locationOnProf !== undefined) {
        document.getElementById('locationonprof').checked = response.locationOnProf
    }
    if (settObj.subscribedEventsOnProf !== undefined) {
        document.getElementById('subscribedeventsonprof').checked = response.subscribedEventsOnProf
    }
    if (settObj.locationOnVD !== undefined) {
        document.getElementById('locationonvd').checked = response.locationOnVD
    }
}

/**
 * Events
 */
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
                window.location.reload(true)
                document.getElementById('my-events').click() // does nothing
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

const showText = (element, text) => {
    element.textContent = text
    element.classList.remove('hidden')
}

/**
 * Edit Content
 * - Switch content and edit areas
 * - Switch edit button icon
 */
const toggleEditContent = (inst) => {
    inst.parentElement.children[1].classList.toggle('hidden-fadein-driver')
    inst.parentElement.children[2].classList.toggle('hidden-fadein-driver')
    
    span = inst.children[1]
    icon = inst.children[0]
    if (icon.classList.contains('fa-edit')) {
        span.textContent = 'Save'
    } else if (icon.classList.contains('fa-save')) {
        span.textContent = 'Edit'
    } else {
        throw new Error('portal toggle edit button error')
    }
    
    icon.classList.toggle('fa-save')
    icon.classList.toggle('fa-edit')
}

/*
 * Request Logout
 */
function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/account/logout')
    xhr.send()
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                // refresh page
                window.location.replace('/account')
            }
        }
    }
}


/**
 * Unused
 */
document.querySelectorAll('.button-edit-info').forEach(elem => elem.onclick = editUserInfo)
document.querySelectorAll('.button-edit-pass').forEach(elem => elem.onclick = openPassField)
document.querySelectorAll('.field-textbox').forEach(elem => {
    elem.addEventListener('focusout', registerInfo)
    elem.addEventListener('keypress', unfocusOnEnter)
})

/*
 * Edit Field
 */
function editUserInfo() {
    const editArea = this.previousElementSibling
    const text = editArea.children[0]
    const textBox = editArea.children[1]
    if (textBox.classList.contains('hidden')) {
        toggleEditArea(text, textBox)
        textBox.select()
    }
}

/**
 * Register Input result to screen by various means
 * - Click elsewhere
 * - Enter key
 */
function registerInfo() {
    const text = this.parentElement.children[0]
    const textBox = this
    if (textBox.value !== '') {
        text.textContent = textBox.value
    }
    toggleEditArea(text, textBox)
}
function unfocusOnEnter(e) {
    if (e.key === 'Enter') {
        this.blur()
    }
}

function toggleEditArea(text, textBox) {
    text.classList.toggle('hidden')
    textBox.classList.toggle('hidden')
}

/*
 * Open password area
 */
function openPassField() {
    document.querySelectorAll('.password-field').forEach(field => field.classList.toggle('hidden'))
}
