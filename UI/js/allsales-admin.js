const token = localStorage.getItem('token')
const access_token = "Bearer " + token
if (token === null){
  let notify = document.getElementById("notify")
  notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login as admin to view all sales
</div>`
}

//Getting our sales from the REST API
fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/sales",{
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
	data["All Sales"].forEach(function(sale){
	output+=`
	<table>
     <caption>User ID: ${sale.user_id} Sales Records</caption>
      <thead>
        <tr>
          <th scope="col">Product ID</th>
		  <th scope="col">Sales ID</th>
          <th scope="col">Sold Quantity</th>
          <th scope="col">Product Price</th>
		  <th scope="col">User ID</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td colspan="5">attendantID: ${sale.user_id}</td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <th scope="row">${sale.product_id}</th>
          <td>${sale.sales_id}</td>
          <td>${sale.sales_quantity}</td>
          <td>${sale.prod_price}</td>
          <td>${sale.user_id}</td>
        </tr>        
          
      </tbody>
</table>
	`
	;
	let notify = document.getElementById("notify")
     notify.innerHTML =
  `<div class="isa_success">
    <i class="fa fa-check"></i>
    All sales retrieved successfully!
</div>`
	});
	document.getElementById('body').innerHTML = output;
	
})

