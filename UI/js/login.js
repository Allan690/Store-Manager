// get submit button and add event listener to it
const submitbtn = document.getElementById("submit");
if(submitbtn){
submitbtn.addEventListener('click', loginFunction)
}
//call back function
function loginFunction(e){
	e.preventDefault();
    //  the data to post
    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
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
		localStorage.setItem('token', response.token);
		if (response.Message === "User logged in successfully!"){
			// redirect to index page
            document.getElementById("notify").innerHTML =`<div class="isa_success">
                               <i class="fa fa-check"></i>
     ${response.Message}
    </div>`;
        window.location.assign('./index.html')
		}
		else{
			let notify = document.getElementById("notify");
			notify.innerHTML =`<div class="isa_info">
                        <i class="fa fa-info-circle"></i>
                        ${response.Message}
                         </div>`
		}

	})
}
