// get update button and add event listener to it
const token = localStorage.getItem('token');
const accessToken = "Bearer " + token;
if (token === null){
    let notify = document.getElementById("notify");
    notify.innerHTML =`<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login with your admin credentials to proceed.
</div>`;
   setTimeout("location.assign('../HTML/login.html')", 3000);
}
const idField = document.getElementById('prod_id');
if(idField){
    idField.addEventListener('change', updateProduct)
}
const updateBtn = document.getElementById("updatebtn");
if(updateBtn){
updateBtn.addEventListener('click', updateProduct)
}
//call back function
function updateProduct(e){
	e.preventDefault();
    let prodID = parseInt(document.getElementById("prod_id").value, 10);
    //try to get the element using the supplied id
    fetch(`https://store-manager-api-app-v2.herokuapp.com/api/v2/products/${prodID}`,{
        headers:{
            "Content-type":"application/json",
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Request-Method': '*',
            "Authorization": accessToken
        },
        method:"GET",
        mode:"cors",

    })
        .then(function(response){return response.json()})
        .then((data) => {
            // check if the user left the text fields empty and if so fill them with default values
            let name = document.getElementById("prod_name").value;
            let quantity = parseInt(document.getElementById("prod_quantity").value, 10);
            let price = parseInt(document.getElementById("prod_price").value, 10);
            let minimum = parseInt(document.getElementById("minimum_allowed").value, 10);
            let description = document.getElementById("prod_description").value;
            let category = document.getElementById("prod_category").value;
            if(name === ""){
                name = data["Product Profile"].prod_name;
                document.getElementById('prod_name').placeholder = name;
            }
            if(isNaN(price)) {
                price = data["Product Profile"].prod_price;
                document.getElementById('prod_price').placeholder = price;
            }
            if(description === "") {
                description = data["Product Profile"].prod_description;
                document.getElementById('prod_description').placeholder = description;
            }
            if(isNaN(quantity)){
                quantity = data["Product Profile"].prod_quantity;
                document.getElementById('prod_quantity').placeholder = quantity;
            }
            if(isNaN(minimum)) {
                minimum = data["Product Profile"].minimum_allowed;
                document.getElementById('minimum_allowed').placeholder = parseInt(minimum, 10);
            }
            if(category === "") {
                category = data["Product Profile"].prod_category;
                document.getElementById('prod_category').placeholder = category;
            }
            console.log(name);
            const updateData = {
                prod_id: prodID,
                prod_name: name,
                prod_category: category,
                prod_price: price,
                prod_quantity: quantity,
                minimum_allowed: parseInt(minimum, 10),
                prod_description: description
            };

            fetch(`https://store-manager-api-app-v2.herokuapp.com/api/v2/products/${prodID}`,{
                headers:{
                    "Content-type":"application/json",
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Request-Method': '*',
                    "Authorization": accessToken
                },
                method:"PUT",
                mode:"cors",
                body: JSON.stringify(updateData)

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
                        location.assign("../HTML/index.html")
                    }
                    else if(response.Message === 'Product already exists'){
                        let notify = document.getElementById("notify");
                        notify.innerHTML =
                  `  <div class="isa_info">
                            <i class="fa fa-info-circle"></i>
                            Product found. You can now edit the product details.
                            </div>`;
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
        });

}

