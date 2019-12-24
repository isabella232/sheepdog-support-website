console.log(document.getElementById('program-box').value)

document.getElementById('request-form').addEventListener('submit',(event)=>submitForm(event))

function submitForm(event){
event.preventDefault()

const formObj = {
    program: document.getElementById('program-box').value,
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    recipientFirstName: document.getElementById('recipient-first-name').value,
    recipientLastName: document.getElementById('recipient-last-name').value,
    email: document.getElementById('email-address').value
    }
    var xhr = new XMLHttpRequest();
    xhr.open('Post', '/assistance/form', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(formObj));
}