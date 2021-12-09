//this file is for managing the miletones page
//update function checks if each milestone is completed and updates text
//each milestone has its own div with Id m1, m2, m3 etc
chrome.runtime.onStartup.addListener(update());
chrome.storage.onChanged.addListener(update());
chrome.storage.onChanged.addListener(checkNumEntries());

function checkNumEntries(){
	var entries = 0;
	chrome.storage.sync.get('totalEntries', function(result){
			let entries = result.totalEntries;
			if(entries >= 1){
					chrome.storage.sync.set({'m2a' : true}, function(){});
			}
			if(entries >= 5){
					chrome.storage.sync.set({'m2b' : true}, function(){});

			}
			if(entries >= 10){
					chrome.storage.sync.set({'m2c' : true}, function(){});

			}
	});
}

//checks milestones at install and whenever storage is modified
function update(){

	checkNumEntries();

	//for each milestone check its value and update display
	chrome.storage.sync.get('m1', function (result) {
		if(result.m1 == true){
			document.getElementById("m1").innerHTML = "Create a profile - Complete!";
		}else{
			document.getElementById("m1").innerHTML = "Create a profile In Progress";
		}
	});
	chrome.storage.sync.get('m2a', function (result) {
		if(result.m2a == true){
			document.getElementById("m2a").innerHTML = "Make your first entry - Complete!";
		}else{
			document.getElementById("m2a").innerHTML = "Make your first entry In Progress";
		}
	});
	chrome.storage.sync.get('m2b', function (result) {
		if(result.m2b == true){
			document.getElementById("m2b").innerHTML = "Make 5 entries - Complete!";
		}else{
			document.getElementById("m2b").innerHTML = "Make 5 entries  In Progress";
		}
	});
	chrome.storage.sync.get('m2c', function (result) {
		if(result.m2c == true){
			document.getElementById("m2c").innerHTML = "Make 10 entries - Complete!";
		}else{
			document.getElementById("m2c").innerHTML = "Make 10 entries  In Progress";
		}
	});
	chrome.storage.sync.get('m3', function (result) {
		if(result.m2d == true){
			document.getElementById("m3").innerHTML = "Reach a 7-day streak - Complete!";
		}else{
			document.getElementById("m3").innerHTML = "Reach a 7-day streak In Progress";
		}
	});
	chrome.storage.sync.get('m4', function (result) {
		if(result.m2e == true){
			document.getElementById("m4").innerHTML = "Use 3 descriptors for a symptom - Complete!";
		}else{
			document.getElementById("m4").innerHTML = "Use 3 descriptors for a symptom  In Progress";
		}
	});
}

