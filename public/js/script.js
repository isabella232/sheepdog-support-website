console.log('general script loaded!')

window.addEventListener('load', init())

function init() {
    checkLogin()
}

function checkLogin() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/account/portal/data')
    xhr.send()
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.responseText !== "no-auth") {
                document.getElementById('account').innerHTML = 'My Account'
            }
        }
    }
}
