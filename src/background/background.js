
function execute(item) {

	if(item.bfToggle == false) { //if the extension is turned off, don't do anything
		browser.tabs.executeScript({file: "/content_scripts/bfOff.js"});
	} else {
		browser.tabs.executeScript({file: "/content_scripts/bfOn.js"});
	}

}

function doNothing() {
	return;
}

//if the toggle is set, do something in the background based on its value
//otherwise, don't do anything
browser.storage.local.get("bfToggle")
.then(execute, doNothing);