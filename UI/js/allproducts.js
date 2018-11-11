let sect = document.getElementById('product')
var prod_id;
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
	
	let output = ''
	data["All products"].forEach(function(product){
	output+=`
	<form action="createsale.html">
	<div class="card">
    <img src="images/mystoresbg.jpg" alt="Store logo" style="width:100%">
    <h1>${product.prod_name}</h1>
	<p id="productid"> Product ID: ${product.prod_id} </p>
	<hr>
	<input type="hidden" name="product_id" id="product_id" value=${product.prod_id}>
    <p class="price"> Price: ${product.prod_price}</p>
	<hr>
	<p class="quantity"> Quantity: ${product.prod_quantity}</p>
	<hr>
    <p class="description">Description: ${product.prod_description} </p>
	<hr>
    <button type="submit" id="btnSale">Add to Cart</button>
    </div>	
	</form>
	`
	;
	
	});
	document.getElementById('product').innerHTML = output;
	
})

