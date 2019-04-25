var shouldRedirect = false; //whether or not to redirect 

//if bfToggle is true, we should redirect.
function editToggle(item) {
	shouldRedirect = item.bfToggle;
}

//redirect the request to the extension page
async function onChange(requestDetails) {

	await browser.storage.local.get("bfToggle").then(editToggle, function() {}); 
	//we should redirect if toggle is available, otherwise nothing.

	if(shouldRedirect) {
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(addToMemory, onTabsError);

		var resourceUrl = browser.runtime.getURL("redirect.html");

		return {
			redirectUrl: resourceUrl
		};
	} else return; //don't do anything if we're not redirecting.

}

function onTabsError(error) {
	console.log(`Error: ${error}`);
}

//add the currently selected tab id and url to memory
function addToMemory(tabs) {

	for(let tab of tabs) {
		var obj = {};
		obj[tab.id] = {address: tab.url};
		var setOp = browser.storage.local.set(obj);
		setOp.then(function() {console.log("Storage success");},
			function() {console.log("Storage failure");}
			);
	}

}

browser.webRequest.onBeforeRequest.addListener(
	onChange,
	{urls: ["<all_urls>"]},
	["blocking"]
	);