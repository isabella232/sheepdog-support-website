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
            const response = JSON.parse(xhr.responseText)
            if (this.status === 200) {
                console.log('Logged in!')
                saveTokenAsCookie(response.token)

                // redirect to profile or home
            }
            else if (this.status === 400) {
                const signinErr = document.getElementById('signin-error')
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
            const response = JSON.parse(xhr.responseText)
            if (this.status === 201) {
                console.log('Signed up!')
                // redirect to profile or home
            }
            else if (this.status === 400) {
                const signupErr = document.getElementById('signup-error')
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

const saveTokenAsCookie = (token) => {
    document.cookie=token
}
