console.log('Client side JavaScript is loaded!')

document.forms["signin"].addEventListener('submit', (event) => signIn(event))
document.forms["signup"].addEventListener('submit', (event) => signUp(event))
document.getElementById('go-signin').onclick = toggleSign
document.getElementById('go-signup').onclick = toggleSign

function toggleSign() {
    document.forms["signin"].classList.toggle('hidden-transition-driver')
    document.forms["signup"].classList.toggle('hidden-transition-driver')
    document.getElementById('go-signin').classList.toggle('sign-not-active')
    document.getElementById('go-signup').classList.toggle('sign-not-active')
}


/*
 * Sign In Form
 */
function signIn(event) {
    event.preventDefault()

    const userObj = {
        email: document.forms["signin"]["signin-email"].value,
        password: document.forms["signin"]["signin-password"].value
    }

    const signinErr = document.getElementById('signin-error')
    if (userObj.email === '' || userObj.password === '') {
        return editTextAndUnhide(signinErr, "Enter Your Login Information")
    }

    const jsonData = JSON.stringify(userObj);

    // save to database
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/account/login', true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(jsonData)
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            // const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                console.log('Logged in!')
                window.location.replace('/')
            }
            else if (this.status === 400) {
                showMessageSignIn(signinErr)
            }
        }
    }
}

const showMessageSignIn = (signinErr) => {
    editTextAndUnhide(signinErr, 'Incorrect Email/Password')
}

/*
 * Sign Up Form
 */
function signUp(event) {
    event.preventDefault()

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
                showMessageSignUp(response, signupErr)
            }
        }
    }
}

const showMessageSignUp = (response, signupErr) => {
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

const editTextAndUnhide = (element, text) => {
    element.textContent = text
    element.parentElement.classList.remove('hidden')
}
