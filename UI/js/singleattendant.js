if (token === null){
  alert("Please login to view the sales page!")
}

//Getting attendant details from the rest api
fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/users",{
headers: {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Request-Method': '*',
	'Authorization': access_token
},
method:"GET",
mode: "cors",
})
.then(function(response)
{
	return response.json()
	
	})
.then((data) => {
	let output = ''
	output+=
	`
<div class="att-profile">
<img src="images/avatar-homme.png" alt="attendant image" style="width:100%">
<hr>
<p>Attendant ID: ${data["User Profile"].user_id} </p><hr>
<p>Attendant Email: ${data["User Profile"].email} </p><hr>
</div>

	`
	;
	
	document.getElementById('attdetails').innerHTML = output;
	
})

