var submitbtn = document.getElementById("btnSale")
if(submitbtn){
submitbtn.addEventListener('click', createSale);	
} 


let qString = window.location.search;
let product_id = parseInt(qString.replace(/\D/g,''), 10);
function createSale(e){
	e.preventDefault()
	let quantity = parseInt(document.getElementById("prod_quantity").value, 10);
	var data = 
		{
			prod_id:product_id,
			quantity:quantity
		};
	
	
	let token = localStorage.getItem("token");
	access_token = "Bearer "+token;
	if (token === null){
  let notify = document.getElementById("notify")
  notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login as an attendant to make a sale
</div>`
	window.location.href = "./login.html"
   }
	fetch('https://store-manager-api-app-v2.herokuapp.com/api/v2/sales', {
		method: "POST",
		headers: {
		'Content-Type': 'application/json',
	    'Access-Control-Allow-Origin':'*',
	    'Access-Control-Request-Method': '*',
	    'Authorization': access_token
		},
		    
	mode:"cors",
	body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then(function (response) {
		
		if (response.Message === "Sale record created successfully!"){
			// redirect to index page
        notify.innerHTML =
                      `<div class="isa_success">
     <i class="fa fa-check"></i>
     ${response.Message}
</div>`
			window.location.href = './index.html'
		}
		else{
            notify.innerHTML =
                      `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    ${response.Message}
</div>`
		}

	
	})
}
