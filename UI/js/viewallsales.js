const token = localStorage.getItem('token')
const access_token = "Bearer " + token
if (token === null){
  alert("Please login to view the sales page!")
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
	console.log(data)
	let output = ''
	data["Sale records"].forEach(function(sale){
	output+=`
	    <tr>
          <th scope="row">${sale.product_id}</th>
          <td>${sale.sales_id}</td>
          <td>${sale.sales_quantity}</td>
          <td>${sale.prod_price}</td>
          <td>${sale.user_id}</td>
        </tr>
	`
	;
	
	});
	document.getElementById('tablebody').innerHTML = output;
	
})

