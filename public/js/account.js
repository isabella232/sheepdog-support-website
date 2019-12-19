console.log('Client side JavaScript is loaded!')

// const currentSelection = 'signup'
// if (currentSelection === 'signup') {

// }

/*
 * Sign In Form
 */
// signinForm.addEventListener('submit', (e) => {
//     e.preventDefault()
const signIn = () => {
    const userObj = {
        email: document.getElementById('signin-email').value,
        password: document.getElementById('signin-password').value
    }
    const jsonData = JSON.stringify(userObj);

    // save to database
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/account/login', true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(jsonData)
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log('Logged in!')
                // redirect to profile or home
            }
            else if (this.status === 400) {
                const signinErr = document.getElementById('signin-error')
                const response = JSON.parse(xhr.responseText)
                if (Object.keys(response).length === 0) {
                    if (userObj.email === '' || userObj.password === '') {
                        signinErr.textContent = 'Enter Your Login Information'
                        signinErr.style.display = 'block'
                    } else {
                        signinErr.textContent = 'Incorrect Email/Password'
                        signinErr.style.display = 'block'
                    }
                }
            }
        }
    }
}

/*
 * Sign Up Form
 */
// signupForm.addEventListener('submit', (e) => {
//     e.preventDefault()
const signUp = () => {
    const userObj = {
        name: document.getElementById('signup-name').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value
    }
    const jsonData = JSON.stringify(userObj);

    // save to database
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/account/signup', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonData)
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 201) {
                console.log('Signed up!')
                // redirect to profile or home
            }
            else if (this.status === 400) {
                const signupErr = document.getElementById('signup-error')
                const response = JSON.parse(xhr.responseText)
                console.log(response.message)
                if (response.message) {
                    // Check Required
                    if (response.message.includes('required')) {
                        signupErr.textContent = "All information is required."
                        signupErr.style.display = "block"
                    } 
                    // Check valid email
                    else if (response.message.includes('invalid email')) {
                        signupErr.textContent = "Email is invalid."
                        signupErr.style.display = "block"
                    }
                    // Check strong Password
                    else if (response.message.includes('password') || response.message.includes('shorter')) {
                        signupErr.textContent = "Please provide a stronger password!"
                        signupErr.style.display = "block"
                    }
                }
                else if (response.name === "MongoError") {
                    // Check Duplicate Emails
                    const dupeErr = "E11000 duplicate key error"
                    if (response.errmsg.includes(dupeErr)) {
                        signupErr.textContent = "That email already exists!"
                        signupErr.style.display = "block"
                    }
                }
            }
        }
    }
}

/*
 * Contact Us Form
 */
{/* <form action="event.preventDefault();sendForm()" method=POST>
<div id="signup-error" class="error-message" style="display:none">That email already exists!</div>
<input type="name" class="signin-bar input-name" placeholder="Name" id="contact-name">
<input type="email" class="signin-bar input-email" placeholder="Email Address (Optional)" id="contact-email">
<input type="subject" class="signin-bar input-subject" placeholder="Subject" id="contact-subject">    
<input type="body" class="signin-bar input-body" placeholder="Body" id="contact-body">     */}


const sendForm = () => {
    const formObj = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        subject: document.getElementById('contact-subject').value,
        body: document.getElementById('contact-body').value
    }
    const jsonData = JSON.stringify(formObj);

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
                const signinErr = document.getElementById('contact-form-error')
                const response = JSON.parse(xhr.responseText)
                if (Object.keys(response).length === 0) {
                    if (formObj.name === '' || formObj.subject === '' || formObj.body === '') {
                        signinErr.textContent = 'Missing information'
                        signinErr.style.display = 'block'
                    }
                }
            }
        }
    }
}