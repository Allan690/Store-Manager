function saleByID(){
let searchbox = document.getElementById('searchbox');
let sale_id = parseInt(searchbox.value, 10)
const token = localStorage.getItem('token')
const access_token = "Bearer " + token
if (token === null){
  let notify = document.getElementById("notify")
  notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login to view this page
</div>`
}


//Getting our sale from the REST API
fetch(`https://store-manager-api-app-v2.herokuapp.com/api/v2/sales/${sale_id}`,{
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
	let output = '';
	output+=`
	<table>
     <caption>User ID ${data["Sale Profile"].user_id} Sales Records</caption>
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
          <td colspan="5">attendantID: ${data["Sale Profile"].user_id}</td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <th scope="row">${data["Sale Profile"].product_id}</th>
          <td>${data["Sale Profile"].sales_id}</td>
          <td>${data["Sale Profile"].sales_quantity}</td>
          <td>${data["Sale Profile"].prod_price}</td>
          <td>${data["Sale Profile"].user_id}</td>
        </tr>        
          
      </tbody>
</table>
	`
	;
	let notify = document.getElementById("notify")
     notify.innerHTML =
  `<div class="isa_success">
    <i class="fa fa-check"></i>
    Sale profile retrieved successfully!
</div>`
	
	document.getElementById('body').innerHTML = output;
	
})
}
