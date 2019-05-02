function sendBack() {
	var message = {
		type: "sendBack"
	}
	browser.runtime.sendMessage(message);
}

document.getElementById("button").addEventListener("click", sendBack);
