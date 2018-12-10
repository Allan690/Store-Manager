const token = localStorage.getItem('token');
const accessToken = "Bearer " + token;
if (token === null){
  let notify = document.getElementById("notify");
  notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login to view products page
</div>`;
	setTimeout('location.assign("../HTML/login.html")', 3000);
}


//Getting our products from the REST API
fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/products",{
headers: {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Request-Method': '*',
	'Authorization': accessToken
},
method:"GET",
mode: "cors",
})
.then(function(response)
{
	return response.json()
	
	})
.then((data) => {
	
	let output = '<div></div>';
	data["All products"].forEach(function(product){
	output+=`
	<div class="prod-profile">
    <img src="../images/mystoresbg.jpg" alt="Store logo" style="width:100%">
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
	
});
