function startListeningOnTab(tab) {
    if (tab.url.indexOf("https://docs.google.com/presentation/") == 0) {
        chrome.tabs.executeScript(tab.id, {
            "file": "contentScript.js",
            "allFrames": true
        }, function () {
            console.log("Script Executed .. ");
        });
    }
}
function genericOnClick(info, tab) {
    startListeningOnTab(tab);
}
function init() {

    var child1 = chrome.contextMenus.create(
        {
            "title": "Start Voice Clicker",
            "documentUrlPatterns": ["https://docs.google.com/presentation/*/present*"],
            "contexts": ["frame"],
            "onclick": genericOnClick
        });
}



init()