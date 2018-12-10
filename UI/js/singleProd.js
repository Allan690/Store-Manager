const searchBtn= document.getElementById('searchBtn');
if(searchBtn){
    searchBtn.addEventListener('click', getProductByName)
}
function getProductByName(){
    const token = localStorage.getItem('token');
    console.log(token);
    const searchBox= document.getElementById('searchbox');
    console.log(searchBox.value);
    const access_token = "Bearer " + token;
    if (token === null){
        let notify = document.getElementById("notify");
        notify.innerHTML =`<div class="isa_error">
   <i class="fa fa-times-circle"></i>
   Please login to view the products page!
</div>`
    }
    fetch(`https://store-manager-api-app-v2.herokuapp.com/api/v2/products/${searchBox.value}`,{
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
            console.log(data);
            console.log(data.Message);
            let output = '<div></div>';
            output+=`
	<div class="prod-profile">
    <img src="../images/mystoresbg.jpg" alt="Store logo" style="width:100%">
    <h1>${data["Product Profile"].prod_name}</h1><hr>
	<p id="prod_id"> Product ID: ${data["Product Profile"].prod_id}</p> <hr>
    <p class="price">Price: ${data["Product Profile"].prod_price}</p><hr>
    <p class="description">Description: ${data["Product Profile"].prod_description.substring(0,30)}</p>
	<hr>
	<p class="quantity">Quantity: ${data["Product Profile"].prod_quantity}</p>
	<hr>
	<p>Minimum Allowed Qty: ${data["Product Profile"].minimum_allowed}</p>
	<hr>
	<p>Category: ${data["Product Profile"].prod_category}</p>
	<hr>
	<button id="btndelete" onclick="deleteProductByID();">Delete Product</button>
    </div>
	`
            ;
            let notify = document.getElementById("notify");
            notify.innerHTML =
                `<div class="isa_success">
    <i class="fa fa-check"></i>
    Product retrieved successfully!
</div>`;
          //  console.log(notify.innerHTML);
            product_id = data["Product Profile"].prod_id;
            localStorage.setItem('product_id', product_id);
            document.getElementById('product').innerHTML = output;
        })

}