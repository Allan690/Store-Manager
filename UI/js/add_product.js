// get submit button and add event listener to it
let submitbtn = document.getElementById("addprod");
if(submitbtn){
submitbtn.addEventListener('click', addProduct)
}
const token = localStorage.getItem('token');
const access_token = "Bearer " + token;

if (token === null){
    let notify = document.getElementById("notify");
    notify.innerHTML =`<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login with your admin credentials to proceed.
</div>`;
    window.location.href = "./login.html"
}
//call back function
function addProduct(e){
	e.preventDefault();

    const name = document.getElementById("prod_name").value;
    const quantity = parseInt(document.getElementById("prod_quantity").value, 10);
    const price = parseInt(document.getElementById("prod_price").value, 10);
    const minimum = parseInt(document.getElementById("minimum_allowed").value, 10);
    const description = document.getElementById("prod_description").value;
    const category = document.getElementById("prod_category").value;

    const data = {
	prod_name:name,
	prod_category:category,
    prod_price:price,
    prod_quantity:quantity,
    minimum_allowed:minimum,
    prod_description:description
};

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
      let notify = document.getElementById("notify");
	notify.innerHTML =`<div class="isa_success">
     <i class="fa fa-check"></i>
     ${response.Message}
       </div>`;
			window.location.href = './index.html'
		}
		else{
      let notify = document.getElementById("notify");
	notify.innerHTML =`<div class="isa_info">
                   <i class="fa fa-info-circle"></i>
                ${response.Message}
                         </div>`
		}

	})
}
