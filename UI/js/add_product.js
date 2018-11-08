// get submit button and add event listener to it
var submitbtn = document.getElementById("addprod")
if(submitbtn){
submitbtn.addEventListener('click', addProduct)
}
//call back function
function addProduct(e){
	e.preventDefault()

	var name = document.getElementById("prod_name").value
  var quantity = parseInt(document.getElementById("prod_quantity").value, 10)
  var price = parseInt(document.getElementById("prod_price").value, 10)
  var minimum = parseInt(document.getElementById("minimum_allowed").value, 10)
  var description = document.getElementById("prod_description").value
  var category = document.getElementById("prod_category").value

var data = {
	prod_name:name,
	prod_category:category,
    prod_price:price,
    prod_quantity:quantity,
    minimum_allowed:minimum,
    prod_description:description
};

const token = localStorage.getItem('token')
const access_token = "Bearer " + token

if (token === null){
  alert("Please login with your admin credentials")
	window.location.href = "./login.html"
}

fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/products",{
	headers:{
		"Content-type":"application/json",
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*',
		"Authorization": access_token
	},
	method:"POST",
	mode:"cors",
	body: JSON.stringify(data)

	}).then(function(response){return response.json()})
	.then(function(response){
		if (response.Message === "Product registered successfully"){
			// redirect to index page
      alert(response.Message)
			window.location.href = './index.html'
		}
		else{
      alert(response.Message)
		}

	})
}
