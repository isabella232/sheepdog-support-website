console.log('Client side JavaScript is loaded!')

var changed = true;

/** Portal */
document.getElementById('user-info').onclick = toUserInfo
document.getElementById('button__edit-content-info').onclick = toggleUserInfo

document.getElementById('settings').onclick = toSettings
document.getElementById('button__edit-content-settings').onclick = toggleSettings

document.getElementById('my-events').onclick = toMyEvents

document.querySelectorAll('.button-edit-info').forEach(elem => elem.onclick = editUserInfo)
document.querySelectorAll('.button-edit-pass').forEach(elem => elem.onclick = openPassField)
document.querySelectorAll('.field-textbox').forEach(elem => {
    elem.addEventListener('focusout', registerInfo)
    elem.addEventListener('keypress', unfocusOnEnter)
})
// document.getElementById('user-info-save').onclick = saveUserInfo
document.getElementById('button-logout').onclick = logout


function toUserInfo() {
    hideAllContents()
    document.getElementById('user-info-content').classList.remove('hidden-fadein-driver')
    document.getElementById('portal-current-select').style.top = '28px';
}
function toggleUserInfo() {
    icon = this.children[0]
    if (icon.classList.contains('fa-save')) {
        saveUserInfo()
    }
    toggleEditContent(this)
}

function toSettings() {
    hideAllContents()
    document.getElementById('settings-content').classList.remove('hidden-fadein-driver')
    document.getElementById('portal-current-select').style.top = '79px';
}
function toggleSettings() {
    icon = this.children[0]
    if (icon.classList.contains('fa-save')) {
        saveSettings()
    }
    toggleEditContent(this)
}

function toMyEvents() {
    hideAllContents()
    document.getElementById('my-events-content').classList.remove('hidden-fadein-driver')
    document.getElementById('portal-current-select').style.top = '130px';
}
const hideAllContents = () => {
    document.querySelectorAll('.portal-content').forEach(elem => elem.classList.add('hidden-fadein-driver'))
}

/**
 * Save UserInfo
 */
const saveUserInfo = () => {
    if (!changed) {
        return
    }

    const userObj = {
        firstName: document.forms['edit-content-info']['firstname'].value,
        lastName: document.forms['edit-content-info']['lastname'].value,
        username: document.forms['edit-content-info']['username'].value,
        biography: document.forms['edit-content-info']['biography'].value,
        location: document.forms['edit-content-info']['location'].value,
    }

    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/account/portal')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(userObj))
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                document.getElementById('fullname').textContent = response.firstName + " " + response.lastName
                document.getElementById('username').textContent = response.username
                document.getElementById('location').textContent = response.location
                if (response.biography !== '') {
                    document.getElementById('biography').textContent = response.biography
                } else {
                    document.getElementById('biography').textContent = 
                        'Apparently, this user prefers to keep an air of mystery about them.'
                }
            } else {
                // const response = JSON.parse(xhr.responseText)
                // console.log(response)
            }
        }
    }
}

/**
 * Save Settings
 */
const saveSettings = () => {
    if (!changed) {
        return
    }

    const userObj = {
        email: document.forms['edit-content-settings']['email'].value,
        // password: document.forms['edit-content-settings']['newpassword'].value,
        // preferences: document.forms['edit-content-settings']['newpassword'].value,
    }

    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/account/portal')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(userObj))
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                document.getElementById('email').textContent = response.email
                // document.getElementById('username').textContent = response.username
            } else {
                console.log(response)
                // const response = JSON.parse(xhr.responseText)
                // console.log(response)
            }
        }
    }
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

