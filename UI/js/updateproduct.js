// get update button and add event listener to it
if (token === null){
    let notify = document.getElementById("notify");
    notify.innerHTML =`<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login with your admin credentials to proceed.
</div>`;
   setTimeout("location.assign('./login.html')", 3000);
}

const updatebtn = document.getElementById("updatebtn");
if(updatebtn){
updatebtn.addEventListener('click', updateProduct)
}
//call back function
function updateProduct(e){
	e.preventDefault();
    const prodid = parseInt(document.getElementById("prod_id").value, 10);
    const name = document.getElementById("prod_name").value;
    const quantity = parseInt(document.getElementById("prod_quantity").value, 10);
    const price = parseInt(document.getElementById("prod_price").value, 10);
    const minimum = parseInt(document.getElementById("minimum_allowed").value, 10);
    const description = document.getElementById("prod_description").value;
    const category = document.getElementById("prod_category").value;

    const data = {
        prod_id: prodid,
        prod_name: name,
        prod_category: category,
        prod_price: price,
        prod_quantity: quantity,
        minimum_allowed: minimum,
        prod_description: description
    };
    const token = localStorage.getItem('token');
const access_token = "Bearer " + token;

fetch(`https://store-manager-api-app-v2.herokuapp.com/api/v2/products/${prodid}`,{
	headers:{
		"Content-type":"application/json",
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Request-Method': '*',
		"Authorization": access_token
	},
	method:"PUT",
	mode:"cors",
	body: JSON.stringify(data)

	}).then(function(response){return response.json()})
	.then(function(response){
		if (response.Message === "Product successfully updated"){
			// redirect to index page
      let notify = document.getElementById("notify");
	notify.innerHTML =
	`<div class="isa_success">
     <i class="fa fa-check"></i>
     Product updated successfully!
</div>`;
			window.location.href = './index.html'
		}
		else{
      let notify = document.getElementById("notify");
	notify.innerHTML =`
	<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    ${response.Message}
</div>`
		}

	})
}
