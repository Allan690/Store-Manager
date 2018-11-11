// get submit button and add event listener to it
var submitbtn = document.getElementById("btnsubmit")
if(submitbtn){
submitbtn.addEventListener('click', signUp)
}
//call back function
function signUp(e){
	e.preventDefault()

	var email = document.getElementById("email").value
	var password = document.getElementById("psw").value

var data = {
	email:email,
	password:password
};

const token = localStorage.getItem('token')
const access_token = "Bearer " + token

if (token === null){
  let notify = document.getElementById("notify")
  notify.innerHTML =`<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login with your admin credentials
</div>`
	window.location.href = "./login.html"
}

fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/signup",{
	headers:{
		"Content-type":"application/json",
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*',
		"Authorization": access_token
	},
	method:"POST",
	mode:"cors",
	body: JSON.stringify(data)

	}).then(function(response){return response.json()})
	.then(function(response){
		if (response.Message === "Attendant user registered successfully"){
			// redirect to index page
         let notify = document.getElementById("notify")
         notify.innerHTML =`<div class="isa_success">
                        <i class="fa fa-check"></i>
						${response.Message}
                          </div>`
			window.location.href = './index.html'
		}
		else{
      let notify = document.getElementById("notify")
         notify.innerHTML =`<div class="isa_error">
                       <i class="fa fa-times-circle"></i>
                       ${response.Message}
                        </div>`
		}

	})
}

function check_password() {
    if (document.getElementById('psw').value ==
            document.getElementById('psw-repeat').value) {
        document.getElementById('btnsubmit').disabled = false;
    } else {
        document.getElementById('btnsubmit').disabled = true;
        alert("Your passwords don't match")
    }
}
