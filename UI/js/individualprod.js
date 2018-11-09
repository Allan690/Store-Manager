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
	output+=`
	<div class="prod-profile">
    <img src="images/mystoresbg.jpg" alt="Store logo" style="width:100%">
    <h1>${product.prod_name}</h1>
	<p class="prod_id" id="prod_id">Product ID: ${product.prod_id} </p>
	<p>Quantity: ${product.prod_quantity} </p>
    <p class="price"> Price: ${product.prod_price}</p>
    <p>Description: ${product.prod_description} </p>
    </div>    
	`
	;
	});
	document.getElementById('product').innerHTML = output;
	
})

var searchbox = document.getElementById('searchbox')
if(searchbox){
	searchbox.addEventListener('search', getProductByID)
}


function getProductByID(){
	
const token = localStorage.getItem('token')
const access_token = "Bearer " + token
if (token === null){
  alert("Please login to view the products page!")
}
fetch(`https://store-manager-api-app-v2.herokuapp.com/api/v2/products/${searchbox.value}`,{
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
	console.log(data);
	console.log(typeof data);
	let output = '<div></div>'
	output+=`
	<div class="prod-profile">
    <img src="images/mystoresbg.jpg" alt="Store logo" style="width:100%">
    <h1>${data["Product Profile"].prod_name}</h1><hr>
	<p id="prod_id"> Product ID: ${data["Product Profile"].prod_id}</p> <hr>
    <p class="price">Price: ${data["Product Profile"].prod_price}</p><hr>
    <p class="description">Description: ${data["Product Profile"].prod_description.substring(0,30)}</p>
	<hr>
	<p class="quantity">Quantity: ${data["Product Profile"].prod_quantity}</p>
	<hr>
	<p>Minimum Allowed Qty: ${data["Product Profile"].minimum_allowed}</p>
	<hr>
	<p>Category: ${data["Product Profile"].prod_category}</p>
	<hr>
	<button id="btndelete" onclick="deleteProductByID();">Delete Product</button>
    </div>
	`
	;
	product_id = data["Product Profile"].prod_id;
	localStorage.setItem('product_id', product_id);
	document.getElementById('product').innerHTML = output;
})

}