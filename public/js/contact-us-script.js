console.log('Client side JavaScript is loaded!')
/*
 * Contact Us Form
 */

document.forms['contact-form'].addEventListener((event) => sendForm);


const sendForm = () => {
    event.preventDefault();
    const formObj = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        subject: document.getElementById('contact-subject').value,
        body: document.getElementById('contact-body').value
    }
    const jsonData = JSON.stringify(formObj);

    const formErr = document.getElementById('contact-form-error')
    if (formObj.email === '' || formObj.name === '' || formObj.subject === '' || formObj.body === '') {
        return showText(signinErr, "Please complete the form")
    }

    // save to database
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact-us/forms', true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(jsonData)
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log('Logged in!')
                // redirect to profile or home
            }
            else if (this.status === 400) {
                showAppropriateTextForm(formErr)
                //const contactErr = document.getElementById('contact-form-error')
                //const response = JSON.parse(xhr.responseText)
                
                // contactErr.textContent = 'Missing information'
                // contactErr.style.display = 'block'
            }
        }
    }
}

const showAppropriateTextForm = (fromErr) => {
    showText(formErr, 'Please Complete the form')
}