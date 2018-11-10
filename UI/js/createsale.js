var submitbtn = document.getElementById("btnSale")
if(submitbtn){
submitbtn.addEventListener('click', createSale);	
} 


let qString = window.location.search;
let product_id = parseInt(qString.replace(/\D/g,''), 10);
console.log(product_id)
function createSale(e){
	e.preventDefault()
	let quantity = parseInt(document.getElementById("prod_quantity").value, 10);
	
     console.log(quantity)
	var data = 
		{
			prod_id:product_id,
			quantity:quantity
		};
	
	
	let token = localStorage.getItem("token");
	access_token = "Bearer "+token;
	if (token === null){
  alert("Please login with your attendant credentials")
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
            alert(response.Message)
			window.location.href = './index.html'
		}
		else{
            alert(response.Message)
		}

	
	})
}
