/* background.js
 * back-end code
 */

//registering an alarm that chrome will always moniter
chrome.alarms.create('welcome_alarm', {
        when: Date.now(),
        periodInMinutes: 0.1 //notification begins immediately and repeats every 0.1 minutes
});



chrome.alarms.onAlarm.addListener((alarm) => {
        if(alarm.name === 'welcome_alarm'){
                chrome.notifications.create('welcome', {
                        type: 'basic',
                        iconUrl: '/images/get_started128.png',
                        title: 'Test Notification',
                        message: 'Welcome to CHronic Symtom Tracker!!'
                });
        }
});













