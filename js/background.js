/* background.js
 * back-end code
 */
//registering an alarm that chrome will always moniter
/*chrome.alarms.create('welcome_alarm', {
        when: Date.now(),
	//periodInMinutes: 0.1
});*/



/* this creates the same notification but is triggered by the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
	if(alarm.name === 'welcome_alarm'){
		chrome.notifications.create('welcome', {
			type: 'basic',
			iconUrl: '/images/get_started128.png',
			title: 'Test Notification',
			message: 'Welcome to CHronic Symtom Tracker!!'
		});
	}
});*/
//create notification that shows when you open the extesnion
chrome.runtime.onMessage.addListener(
	(request) => {
		if (request.greeting === "welcome"){
			chrome.notifications.create('welcome', {
				type: 'basic',
				iconUrl: '/images/foxpicture.jpg',
				title: 'Test Notification',
				message: 'Welcome to Chronic Symptom Tracker!!'
			});
		}
	});

