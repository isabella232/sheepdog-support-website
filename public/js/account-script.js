console.log('Client side JavaScript is loaded!')

// const currentSelection = 'signup'
// if (currentSelection === 'signup') {

// }

/*
 * Sign In Form
 */
function signIn() {
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
            const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                console.log('Logged in!')
                window.location.replace('/')
            }
            else if (this.status === 400) {
                const signinErr = document.getElementById('signin-error')
                if (Object.keys(response).length === 0) {
                    if (userObj.email === '' || userObj.password === '') {
                        editTextAndUnhide(signinErr, 'Enter Your Login Information')
                    } else {
                        editTextAndUnhide(signinErr, 'Incorrect Email/Password')
                    }
                }
            }
        }
    }
}

/*
 * Sign Up Form
 */
function signUp() {
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
            const response = JSON.parse(xhr.responseText)
            if (this.status === 201) {
                console.log('Signed up!')
                window.location.replace('/')
            }
            else if (this.status === 400) {
                const signupErr = document.getElementById('signup-error')
                if (response.message) {
                    // Check Required
                    if (response.message.includes('required')) {
                        editTextAndUnhide(signupErr, "All information is required.")
                    } 
                    // Check valid email
                    else if (response.message.includes('invalid email')) {
                        editTextAndUnhide(signupErr, "Email is invalid.")
                    }
                    // Check strong Password
                    else if (response.message.includes('password') || response.message.includes('shorter')) {
                        editTextAndUnhide(signupErr, "Please provide a stronger password!")
                    }
                }
                else if (response.name === "MongoError") {
                    // Check Duplicate Emails
                    const dupeErr = "E11000 duplicate key error"
                    if (response.errmsg.includes(dupeErr)) {
                        editTextAndUnhide(signupErr, "That email already exists!")
                    }
                }
            }
        }
    }
}

const editTextAndUnhide = (element, text) => {
    element.textContent = text
    element.classList.remove('hidden')
}
