function init() {
    chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
        if (tab.url.indexOf("https://docs.google.com/presentation/") == 0) {
            chrome.tabs.executeScript(tab.id, {
                "file": "contentScript.js",
                "allFrames":true
            }, function () {
                console.log("Script Executed .. "); 
            });
        }
    });
}



init()