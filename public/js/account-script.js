console.log('Client side JavaScript is loaded!')

document.getElementById('go-signin').onclick = toggleSign
document.getElementById('go-signup').onclick = toggleSign
document.forms["signin"].addEventListener('submit', (event) => signIn(event))
document.forms["signup"].addEventListener('submit', (event) => signUp(event))

function toggleSign() {
    document.forms["signin"].classList.toggle('hidden-fadein-driver')
    document.forms["signup"].classList.toggle('hidden-fadein-driver')
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
        return showText(signinErr, "Enter Your Login Information")
    }
 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/account/login', true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(userObj))
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            // const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                console.log('Logged in!')
                window.location.replace('/')
            }
            else if (this.status === 400) {
                showAppropriateTextSignIn(signinErr)
            }
        }
    }
}

const showAppropriateTextSignIn = (signinErr) => {
    showText(signinErr, 'Invalid Combination')
}

/*
 * Sign Up Form
 */
function signUp(event) {
    event.preventDefault()

    const userObj = {
        firstName: document.forms['signup']['firstname'].value,
        lastName: document.forms['signup']['lastname'].value,
        username: document.forms['signup']['username'].value,
        email: document.forms['signup']['email'].value,
        password: document.forms['signup']['password'].value,
        verify: document.forms['signup']['verify'].value
    }

    const signupErr = document.getElementById('signup-error')
    if (userObj.password !== document.forms['signup']['reenter'].value) {
        return showText(signupErr, "Passwords do not match!")
    }

    // save to database
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/account/signup', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userObj))
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            if (this.status === 201) {
                console.log('Signed up!')
                window.location.replace('/')
            }
            else if (this.status === 400) {
                showAppropriateTextSignUp(response, signupErr)
            }
        }
    }
}

const showAppropriateTextSignUp = (response, signupErr) => {
    if (response.message) {
        // Check Required
        if (response.message.includes('required') && document.forms['signup']['signup-reenter'].value === '') {
            showText(signupErr, "All information is required.")
        } 
        // Check valid email
        else if (response.message.includes('invalid email')) {
            showText(signupErr, "Email is invalid.")
        }
        // Check strong Password
        else if (response.message.includes('password') || response.message.includes('shorter')) {
            showText(signupErr, "Please provide a stronger password!")
        }
    }
    else if (response.name === "MongoError") {
        // Check Duplicate Emails
        const dupeErr = "E11000 duplicate key error"
        if (response.errmsg.includes(dupeErr)) {
            showText(signupErr, "That email already exists!")
        }
    } else {
        showText(signupErr, "Invalid input!")
    }
}

const showText = (element, text) => {
    element.textContent = text
    element.classList.remove('hidden')
}
