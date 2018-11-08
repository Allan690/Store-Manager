let sect = document.getElementById('product')

const token = localStorage.getItem('token')
const access_token = "Bearer " + token
console.log(access_token)
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
	console.log(response)
	return response.json()
	
	})
.then((data) => {
	console.log(data)
	
	let output = '<div></div>'
	data["All products"].forEach(function(product){
	output+=`
	<div class="card">
    <img src="images/mystoresbg.jpg" alt="Store logo" style="width:100%">
    <h1>${product.prod_name}</h1>
    <p class="price">${product.prod_price}</p>
    <p>${product.prod_description}</p>
    <button onclick="location.href='attendantsalesrecords.html'">Add to Cart</button>
    </div>
	`
	;
	});
	document.getElementById('product').innerHTML = output;
})

