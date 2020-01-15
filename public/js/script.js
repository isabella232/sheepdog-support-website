


console.log('general script loaded!')

window.addEventListener('load', init())
document.querySelectorAll('.collapsible').forEach(elem => elem.addEventListener('click', toggleContent))

function init() {
    checkLogin()
}

function checkLogin() {

    axios.get('/account/portal/auth').then((data)=>{
        console.log(data)
        document.getElementById('account').textContent = 'My Portal'
        
    }).catch(function(error){
        console.log(error)
    })
   
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', '/account/portal/auth')
    // xhr.send()
    // xhr.onreadystatechange = function () {
    //     if (this.readyState === XMLHttpRequest.DONE) {
    //         if (this.responseText !== "no-auth") {
    //             document.getElementById('account').textContent = 'My Portal'
    //         }
    //     }
    // }
}

function toggleContent() {
	this.classList.toggle("collapsible-not-active");

	var content = this.nextElementSibling;
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
	}
}
