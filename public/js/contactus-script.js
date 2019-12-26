console.log('Client side JavaScript is loaded!')

document.forms['contactus'].addEventListener('submit', (event) => submitForm(event));

function submitForm(event) {
    event.preventDefault()

    const contactusObj = {
        firstName: document.forms['contactus']['firstname'].value,
        lastName: document.forms['contactus']['lastname'].value,
        email: document.forms['contactus']['email'].value,
        subject: document.forms['contactus']['subject'].value,
        body: document.forms['contactus']['body'].value
    }

    const formErr = document.getElementById('contactus-error')
    if (contactusObj.firstName === '' || contactusObj.lastName === '' || contactusObj.email === '' 
            || contactusObj.subject === '' || contactusObj.body === '') {
        return showText(formErr, "Please complete the form")
    }

    // save to database
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact-us', true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(contactusObj))
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            //const response = JSON.parse(xhr.responseText)
            if (this.status === 201) {
                alert('Form submitted!')
                window.location.replace('/contact-us')
            }
            else if (this.status === 400) {
                showAppropriateTextForm(contactusErr)
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
