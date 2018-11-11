//add button click event listener to the submit button
var submitbtn = document.getElementById("btnmakeadmin")
if(submitbtn){
submitbtn.addEventListener('click', createSale);	
} 
let qString = window.location.search;
var urlParams = new URLSearchParams(qString);
var email = urlParams.get('attendant_email');
//set textbox value to passed email
document.getElementById("email").value = email;
//call back function
function createSale(e){
	e.preventDefault()
	var data = 
		{
			email:email
		};
	
	
	let token = localStorage.getItem("token");
	access_token = "Bearer "+token;
	if (token === null){
  alert("Please login with your attendant credentials")
	window.location.href = "./login.html"
   }
	fetch('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/make-admin', {
		method: "PUT",
		headers: {
		'Content-Type': 'application/json',
	    'Access-Control-Allow-Origin':'*',
	    'Access-Control-Request-Method': '*',
	    'Authorization': access_token
		},
		    
	mode:"cors",
	body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then(function (response) {
		
		if (response.Message === "Attendant made admin successfully!"){
			// redirect to index page
            alert(response.Message)
			window.location.href = './attendantprofile.html'
		}
		else{
            alert(response.Message)
		}

	
	})
}
