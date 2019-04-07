function gotToggle(item) {
	document.getElementById("switch").checked = item.bfToggle;
}

function setToggle() {
	browser.storage.local.set({bfToggle: false});
}

browser.storage.local.get("bfToggle")
.then(gotToggle,setToggle);

var checkbox = document.getElementById("switch");

checkbox.addEventListener("change", function() {

	browser.storage.local.set({bfToggle: checkbox.checked});

});