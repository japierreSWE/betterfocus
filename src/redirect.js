function sendBack() {

	/*var answer1 = document.getElementById("text1").value;
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
	}*/

	var answer = document.getElementById("answer").value;

	//if correct, get out of the page.
	if(answer == "Continue") {
		var message = {
			type: "sendBack"
		}
		browser.runtime.sendMessage(message);
	} else {
		document.getElementById("error").textContent = "Input  \"Continue\" to continue to the website.";
	}

}

document.getElementById("button").addEventListener("click", sendBack);
