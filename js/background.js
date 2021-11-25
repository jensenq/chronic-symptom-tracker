/* background.js
 * back-end code
 */
//registering an alarm that chrome will always moniter
let date = new Date();
date.setHours(12);
chrome.alarms.create('notification', {
	when: date.getTime(),
	periodInMinutes: 1440
});



// this creates the same notification but is triggered by the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
	if(alarm.name === 'notification'){
		chrome.notifications.create('welcome', {
			type: 'basic',
			iconUrl: '/images/foxpicture.jpg',
			title: 'Test Notification',
			message: 'Welcome to CHronic Symtom Tracker!!'
		});
	}
});
//create notification that shows when you open the extesnion
chrome.runtime.onMessage.addListener(function (request) {
		if (request.greeting === "notification"){
			chrome.notifications.create('welcome', {
				type: 'basic',
				iconUrl: '/images/foxpicture.jpg',
				title: 'Test Notification',
				message: 'Welcome to Chronic Symptom Tracker!!'
			});
		}
		return true;
	});
/*chrome.runtime.onMessage.addListener(
	(request) => {
		if (request.greeting === "test"){
			console.log("test test testing test tstest");
		}
	});
*/




//set all milestones to incomplete upon installation
chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		console.log("This is a first install!");
		chrome.storage.sync.set({"m1": false}, function() {
			console.log("m1 set");
		});
		chrome.storage.sync.set({"m2a": false}, function() {
                        console.log("m2a set");
                });
		chrome.storage.sync.set({"m2b": false}, function() {
                        console.log("m2b set");
                });
		chrome.storage.sync.set({"m2c": false}, function() {
                        console.log("m2c set");
                });
		chrome.storage.sync.set({"m2d": false}, function() {
                        console.log("m2d set");
                });
		chrome.storage.sync.set({"m2e": false}, function() {
                        console.log("m2e set");
                });
        chrome.storage.sync.set({"totalEntries": 0}, function() {
			console.log("totalEntries set");
                });

	}else if(details.reason == "update"){
		console.log("updated");
	}
});
