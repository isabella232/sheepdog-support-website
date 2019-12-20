console.log('Client side JavaScript is loaded!')

window.addEventListener('load', getData)
document.querySelectorAll('.button-edit-info').forEach(elem => elem.onclick = editInfo)
document.querySelectorAll('.button-edit-pass').forEach(elem => elem.onclick = openPassField)
document.querySelectorAll('.field-textbox').forEach(elem => elem.addEventListener('focusout', registerInfo))
document.getElementById('button-logout').onclick = logout
document.getElementById('button-save').onclick = saveData

/*
 * Get user data
 */
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/account/portal/data')
    xhr.send()
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                setData(JSON.parse(xhr.responseText))
            }
        }
    }
}

function setData(response) {
    document.querySelectorAll('.field-text').forEach(elem => {
        if (elem.nextElementSibling) {
            const compareValue = elem.nextElementSibling.id.replace('portal-', '')
            
            for (k in response) {
                if (compareValue === k) {
                    elem.nextElementSibling.value = response[k]
                    elem.textContent = response[k]
                }
            }
        }
    })
}

function saveData() {
    const userObj = {
        name: document.getElementById('portal-name').value,
        email: document.getElementById('portal-email').value
        // password: document.getElementById('portal-new-pass').value
    }
    const jsonData = JSON.stringify(userObj);

    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/account/portal')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(jsonData)
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                // const response = JSON.parse(xhr.responseText)
                // console.log(response)
                console.log('?')
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

function registerInfo() {
    const text = this.parentElement.children[0]
    const textBox = this
    if (textBox.value !== '') {
        text.textContent = textBox.value
    }
    toggleEditArea(text, textBox)
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

