var adBlockEnabled = false;
var testAd = document.createElement('div');
testAd.innerHTML = '&nbsp;';
testAd.className = 'adsbox';
document.body.appendChild(testAd);
window.setTimeout(function () {
	if (testAd.offsetHeight === 0) {
		// adblock è attivo
		adBlockEnabled = true;
	}
	testAd.remove();
	//// console.log('AdBlock Enabled? ', adBlockEnabled);
	//document.getElementById("status").innerHTML = adBlockEnabled;
	if (adBlockEnabled) {
		window.location.href = "pages/noads.php";
	}
}, 100);

