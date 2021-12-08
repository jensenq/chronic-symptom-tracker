var form = document.getElementById("profile_form");
form.addEventListener("submit", function(){
	let data = form.elements;
	chrome.storage.sync.set({"first_name": data["first_name"].value}, function() {});
	chrome.storage.sync.set({"last_name": data["last_name"].value}, function() {});
	chrome.storage.sync.set({"dob": data["dob"].value}, function() {});
	chrome.storage.sync.set({"address": data["address"].value}, function() {});
	chrome.storage.sync.set({"phone_number": data["phone_number"].value}, function() {});
	chrome.storage.sync.set({"medications": data["medications"].value}, function() {});
	chrome.storage.sync.set({"insurance": data["insurance"].value}, function() {});
	//chrome.storage.local.set({"profile_picture": data["profile_picture"].value}, function() {});

	console.log("profile saved");
	});

chrome.storage.onChanged.addListener(updateProfile());

function updateProfile(){
	chrome.storage.sync.get("first_name", function(result){
		let str = document.getElementById("pName").innerHTML;
		document.getElementById("pName").innerHTML = str + ' ' + result.first_name;
			
	});
	chrome.storage.sync.get("last_name", function(result){
		let str = document.getElementById("pName").innerHTML;
		document.getElementById("pName").innerHTML = str + ' ' + result.last_name;
			
	});
	chrome.storage.sync.get("dob", function(result){
		let dob = document.getElementById("pDob").innerHTML;
		document.getElementById("pDob").innerHTML = dob + ' ' + result.dob.toString();
			
	});
	chrome.storage.sync.get("address", function(result){
		let address = document.getElementById("pAddress").innerHTML;
		document.getElementById("pAddress").innerHTML = address + ' ' + result.address;
			
	});
	chrome.storage.sync.get("phone_number", function(result){
		let num = document.getElementById("pPhone_number").innerHTML;
		document.getElementById("pPhone_number").innerHTML = num + ' ' + result.phone_number;
			
	});
	chrome.storage.sync.get("medications", function(result){
		let meds = document.getElementById("pMedication").innerHTML;
		document.getElementById("pMedication").innerHTML = meds + ' ' + result.medications;
			
	});
	chrome.storage.sync.get("insurance", function(result){
		let ins = document.getElementById("pInsurance").innerHTML;
		document.getElementById("pInsurance").innerHTML = ins + ' ' + result.insurance;
			
	});


	/*chrome.storage.local.get("profile_picture", function(result){
		document.getElementById("profile-picture").innerHTML = "";
		let img = document.createElement("img");
		img.src = result.profile_picture;
		//console.log(result.profile_picture);
		document.getElementById("profile-picture").appendChild(img);

	});*/

	}
