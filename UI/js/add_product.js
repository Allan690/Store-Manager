//Get add product button and add event listener to it
var addbtn = document.getElementById("addprod")
if(addbtn){
  addEventListener("submit", newproduct)
}
//call back function
function newproduct(e){
	e.preventDefault();
	let prod_name = document.getElementById("prod_name").value;
  let category = document.getElementById("prod_category").value;
	let prod_price = document.getElementById("prod_price").value;
	let prod_quantity = document.getElementById("prod_quantity").value;
  let minimum_allowed = document.getElementById("minimum_allowed").value;
  let description = document.getElementById("prod_description").value;


	let access_token = localStorage.getItem("token")
  if (access_token === null){
    alert("Please login as admin user to create a product")
	window.location.href = "./login.html"
}
	fetch('https://store-manager-api-app-v2.herokuapp.com/api/v2/products', {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+access_token
      'Access-Control-Allow-Origin':'*',
  		'Access-Control-Request-Method': '*'
		},
    method:"POST",
  	mode: "cors",
		body: JSON.stringify({
			prod_name:prod_name,
      prod_category:category,
			prod_price:prod_price,
			prod_quantity:prod_quantity,
      minimum_allowed:minimum_allowed,
      prod_description:description
		}),
	})
  .then(function(response){return response.json()})
	.then(function(response){
		localStorage.setItem('token', response.token)
		if (response.Message === "Product registered successfully!"){
			// redirect to index page
			alert(response.Message)
			window.location.href = './attendantprofile.html
		}
		else{
			alert(response.Message)

		}

	})
}
