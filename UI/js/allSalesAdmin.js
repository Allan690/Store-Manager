if (token === null){
  let notify = document.getElementById("notify");
  notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login as admin to view all sales
</div>`;
	setTimeout("location.assign('../HTML/login.html')", 3000);
}

//Getting our sales from the REST API
fetch("https://store-manager-api-app-v2.herokuapp.com/api/v2/sales",{
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
	let output = '';
	data["All Sales"].forEach(function(sale){
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
	let notify = document.getElementById("notify");
     notify.innerHTML =
  `<div class="isa_success">
    <i class="fa fa-check"></i>
    All sales retrieved successfully!
</div>`
	});
	document.getElementById('tablebody').innerHTML = output;
	
});

