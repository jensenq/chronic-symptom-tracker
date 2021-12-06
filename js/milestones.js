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
			if(entries >= 20){
					chrome.storage.sync.set({'m2d' : true}, function(){});

			}
			if(entries >= 50){
					chrome.storage.sync.set({'m2e' : true}, function(){});

			}



	});
}

//checks milestones at install and whenever storage is modified
function update(){
	checkNumEntries();
//for each milestone check its value and update display
	chrome.storage.sync.get('m1', function (result) {
		if(result.m1 == true){
			document.getElementById("m1").innerHTML = "m1 true";
		}else{
			document.getElementById("m1").innerHTML = "m1 false";
		}
	});
	chrome.storage.sync.get('m2a', function (result) {
		if(result.m2a == true){
			document.getElementById("m2a").innerHTML = "m2a true";
		}else{
			document.getElementById("m2a").innerHTML = "m2a false";
		}
	});
	chrome.storage.sync.get('m2b', function (result) {
		if(result.m2b == true){
			document.getElementById("m2b").innerHTML = "m2b true";
		}else{
			document.getElementById("m2b").innerHTML = "m2b  false";
		}
	});
	chrome.storage.sync.get('m2c', function (result) {
		if(result.m2c == true){
			document.getElementById("m2c").innerHTML = "m2c true";
		}else{
			document.getElementById("m2c").innerHTML = "m2c  false";
		}
	});
	chrome.storage.sync.get('m2d', function (result) {
		if(result.m2d == true){
			document.getElementById("md").innerHTML = "m2d true";
		}else{
			document.getElementById("m2d").innerHTML = "m2d false";
		}
	});
	chrome.storage.sync.get('m2e', function (result) {
		if(result.m2e == true){
			document.getElementById("m2e").innerHTML = "m2e true";
		}else{
			document.getElementById("m2e").innerHTML = "m2e  false";
		}
	});
}

