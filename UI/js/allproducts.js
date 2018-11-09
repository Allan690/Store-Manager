let sect = document.getElementById('product')

const token = localStorage.getItem('token')
const access_token = "Bearer " + token
if (token === null){
  alert("Please login to view the products page!")
}

//Getting our products from the REST API
fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/products",{
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
	
	let output = '<div></div>'
	data["All products"].forEach(function(product){
		product_id = product.prod_id;
	output+=`
	<div class="card">
    <img src="images/mystoresbg.jpg" alt="Store logo" style="width:100%">
    <h1>${product.prod_name}</h1>
	<p> Product ID: ${product.prod_id} </p>
	<hr>
    <p class="price"> Price: ${product.prod_price}</p>
	<hr>
    <p>Description: ${product.prod_description} </p>
	<hr>
    <button onclick="location.href='attendantsalesrecords.html'">Add to Cart</button>
    </div>
	`
	;
	});
	document.getElementById('product').innerHTML = output;
	
})

