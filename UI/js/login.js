// get submit button and add event listener to it
var submitbtn = document.getElementById("submit")
if(submitbtn){
submitbtn.addEventListener('click', loginFunction)
}
//call back function
function loginFunction(e){
	e.preventDefault()
	var email = document.getElementById("email").value
	var password = document.getElementById("password").value

	//  the data to post
	var data = {
	email:email,
	password:password,
	};

	//  post the data to db via fetch
	fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/login",{
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*'
	},
	method:"POST",
	mode: "cors",
	body: JSON.stringify(data)

	}).then(function(response){return response.json()})
	.then(function(response){
		localStorage.setItem('token', response.token)
		if (response.Message === "User logged in successfully!"){
			// redirect to index page
			let notify = document.getElementById("notify")
			notify.innerHTML =`<div class="isa_success">
                               <i class="fa fa-check"></i>
     You were successfully logged in!
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
