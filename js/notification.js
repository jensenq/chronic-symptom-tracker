//creating a welcome notification when popup first opens
chrome.runtime.sendMessage({greeting: "welcome"});
