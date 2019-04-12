
function execute(item) {

	if(item.bfToggle == false) { //if the extension is turned off, don't do anything
		return;
	} else {
		browser.tabs.executeScript({file: "/content_scripts/bfOn.js"});
	}

}

function doNothing() {
	return;
}

//if the toggle is set, do something in the background based on its value
//otherwise, don't do anything

function onChange(tabId, changeInfo, tabInfo) {

	if(changeInfo.url) {
		browser.storage.local.set({tabId: changeInfo.url});
		browser.storage.local.get("bfToggle")
		.then(execute, doNothing);
	}

}

browser.tabs.onUpdated.addListener(onChange)