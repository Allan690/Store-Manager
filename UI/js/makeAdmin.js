//add button click event listener to the submit button
const submitBtn = document.getElementById("btnmakeadmin");
if(submitBtn){
submitBtn.addEventListener('click', createSale);
} 
let qString = window.location.search;
const urlParams = new URLSearchParams(qString);
const email = urlParams.get('attendant_email');
//set textbox value to passed email
document.getElementById("email").value = email;
//call back function
function createSale(e){
	e.preventDefault();
    const data =
        {
            email: email
        };


    let token = localStorage.getItem("token");
	accessToken = "Bearer "+token;
	if (token === null){
  let notify = document.getElementById("notify");
  notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Please login with your attendant credentials
</div>`;
setTimeout('location.assign("./login.html")', 3000)
}
	
   
	fetch('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/make-admin', {
		method: "PUT",
		headers: {
		'Content-Type': 'application/json',
	    'Access-Control-Allow-Origin':'*',
	    'Access-Control-Request-Method': '*',
	    'Authorization': accessToken
		},
		    
	mode:"cors",
	body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then(function (response) {
		
		if (response.Message === "Attendant made admin successfully!"){
			// redirect to index page
            let notify = document.getElementById("notify");
            notify.innerHTML =
                             `<div class="isa_success">
                               <i class="fa fa-check"></i>
	                          ${response.Message}
                                 </div>`;

			window.location.assign('../html/attendantprofile.html')
		}
		else{
            let notify = document.getElementById("notify");
     notify.innerHTML =
  `<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    ${response.Message}
</div>`
		}
	
	
	})
}
