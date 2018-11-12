const token1 = localStorage.getItem('token')
const access_token1 = "Bearer " + token1
if (token1 === null){
  let notify = document.getElementById("notify")
  notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login to view this page.
</div>`
}

//Getting attendant details from the rest api
fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/users",{
headers: {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Request-Method': '*',
	'Authorization': access_token1
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
	let notify = document.getElementById("notify")
     notify.innerHTML =
  `<div class="isa_success">
    <i class="fa fa-check"></i>
  Attendant details displayed successfully!
</div>`
	
	document.getElementById('attdetails').innerHTML = output;
	
})

