var shouldRedirect = false; //whether or not to redirect 

//if bfToggle is true, we should redirect.
function editToggle(item) {
	shouldRedirect = item.bfToggle;
}

//redirect the request to the extension page
async function onChange(requestDetails) {


	//we should only be redirecting if we're not coming from the redirect page
	//also, we only want to do this for main_frame requests
	if(!browser.runtime.getURL("redirect.html").includes(requestDetails.originUrl) && requestDetails.type == "main_frame") {
		await browser.storage.local.get("bfToggle").then(editToggle, function() {}); 
		//we should redirect if toggle is available, otherwise nothing.

		//get the current tab and add its details to memory.
		//then redirect to the resource.
		if(shouldRedirect) {
			addToMemory(requestDetails.tabId, requestDetails.url);

			var resourceUrl = browser.runtime.getURL("redirect.html");

			return {
				redirectUrl: resourceUrl
			};
		} else return; //don't do anything if we're not redirecting.
	}

	//we should clear up the memory if we came from the redirect page.
	//otherwise, we'll have local storage leaks.
	if(browser.runtime.getURL("redirect.html").includes(requestDetails.originUrl)) {

		browser.storage.local.remove(requestDetails.tabId.toString());

	}

}

function onTabsError(error) {
	console.log(`Error: ${error}`);
}

//add the currently selected tab id and url to memory
function addToMemory(tabId, toAddress) {

		var obj = {};
		var tabStr = tabId.toString();
		obj[tabStr] = {address: toAddress};
		var setOp = browser.storage.local.set(obj);
		setOp.then(function() {console.log("Storage success");},
			function() {console.log("Storage failure");}
			);

}

//sends user back to webpage after redirect
function sendBack(item) {
	var props = Object.getOwnPropertyNames(item); //we don't know the tab id, so we have to get the properties first
	var idStr = props[0];
	var data = item[idStr]; //this has the address we need
	console.log(data);
	var id = parseInt(idStr);
	var address = data.address;
	browser.tabs.update(id,{
		url: address
	});
}

//handles messages sent
function handleMessage(message, sender, sendResponse) {

	if(message.type == "sendBack") {

		var idStr = sender.tab.id.toString();
		var gotStorage = browser.storage.local.get(idStr);
		gotStorage.then(sendBack, function(error) {console.log("Error with storage"); console.log(error);});

	}

}

browser.webRequest.onBeforeRequest.addListener(
	onChange,
	{urls: ["<all_urls>"]},
	["blocking"]
	);


browser.runtime.onMessage.addListener(handleMessage);