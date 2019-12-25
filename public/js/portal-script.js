console.log('Client side JavaScript is loaded!')

document.querySelectorAll('.button-edit-info').forEach(elem => elem.onclick = editInfo)
document.querySelectorAll('.button-edit-pass').forEach(elem => elem.onclick = openPassField)
document.querySelectorAll('.field-textbox').forEach(elem => {
    elem.addEventListener('focusout', registerInfo)
    elem.addEventListener('keypress', unfocusOnEnter)
})
document.getElementById('button-logout').onclick = logout
document.getElementById('button-save').onclick = saveData

/**
 * Save changed data
 */
function saveData() {
    const userObj = {
        firstName: document.getElementById('portal-firstname').value,
        lastName: document.getElementById('portal-lastname').value,
        email: document.getElementById('portal-email').value
        // password: document.getElementById('portal-new-pass').value
    }
    console.log(userObj)

    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/account/portal')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(userObj))
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                alert('Saved!')
            } else {
                // const response = JSON.parse(xhr.responseText)
                // console.log(response)
            }
        }
    }
}

/*
 * Edit Field
 */
function editInfo() {
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

