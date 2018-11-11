const token = localStorage.getItem('token')
const access_token = "Bearer " + token
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
	data["Users"].forEach(function(user){
	output+=
	`
<form action="makeadmin.html">
<div class="card">
<img src="images/avatar-homme.png" alt="attendant image" style="width:100%">
<hr>
<input type="hidden" name="attendant_email" id="attendant_email" value=${user.email}>
<p>Attendant ID: ${user.user_id} </p><hr>
<p>Attendant Email: ${user.email} </p><hr>
<p> Role: ${user.role} </p><hr>
<p><button type="submit">Make Admin</button></p>
</div>
</form>

	`
	;
	
	});
	document.getElementById('attdetails').innerHTML = output;
	
})

