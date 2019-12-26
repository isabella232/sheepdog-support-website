console.log('Clientside Javascript Loaded!')

document.forms['assist-form'].addEventListener('submit', (event) => submitForm(event))

function submitForm(event) {
    // event.preventDefault()

    const formObj = {
        program: document.forms['assist-form']['program-box'].value,
        firstName: document.forms['assist-form']['first-name'].value,
        lastName: document.forms['assist-form']['last-name'].value,
        recipientFirstName: document.forms['assist-form']['recipient-first-name'].value,
        recipientLastName: document.forms['assist-form']['recipient-last-name'].value,
        email: document.forms['assist-form']['email-address'].value
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/assistance', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(formObj));
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)   
            if (this.status === 201) {
                alert('[SERVER-TEST] We have received your request.')
                window.location.replace('/assistance')
            }
            else if (this.status === 400) {
				console.log(response)
                // showAppropriateTextCreateEvent(response, assistanceError)
            }
        }
    }
}
const showAppropriateTextForm = (formErr) => {
    showText(formErr, 'Please Complete the form')
}

const showText = (element, text) => {
    element.textContent = text
    element.classList.remove('hidden')
}

