function deleteProductByID(){	
const token = localStorage.getItem('token')
const prodid = localStorage.getItem('product_id')
const access_token = "Bearer " + token
if (token === null){
  alert("Please login as admin to delete a product!")
}
// ask the user whether they want to delete the product
if(confirm("Are you sure you want to delete this product?"))
{
	//delete the product after confirm
	fetch(`https://store-manager-api-app-v2.herokuapp.com/api/v2/products/${prodid}`,{
headers: {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Request-Method': '*',
	'Authorization': access_token
},
method:"DELETE",
mode: "cors",
})
.then(function(response)
{
	return response.json()
	
	})
.then(function(response){
		if (response.Message === "Product deleted successfully!"){
			// redirect to individualprod page
      alert(response.Message)
			window.location.href = './individualprodetails.html'
		}
		else{
      alert(response.Message)
		}

	})

}
//continue displaying the current page
else
{
	window.location.href = './individualprodetails.html'
}

}