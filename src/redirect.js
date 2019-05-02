function sendBack() {

	var answer1 = document.getElementById("text1").value;
	var answer2 = document.getElementById("text2").value;
	var answer3 = document.getElementById("text3").value;
	var answer4 = document.getElementById("text4").value;

	//all the answers need to be filled out.
	if(answer1 != "" && answer2 != "" && answer3 != "" && answer4 != "") {

		var message = {
			type: "sendBack"
		}
		browser.runtime.sendMessage(message);
	
	} else {
		document.getElementById("error").textContent = "Not all the questions have been answered.";
	}
}

document.getElementById("button").addEventListener("click", sendBack);
