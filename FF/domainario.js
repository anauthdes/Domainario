//Domainario main script run on access

var hostStr = window.location.hostname;
var pathStr = window.location.pathname;
var originStr = window.location.origin;

var primaryPath = storage.local.get("primaryPath");

primaryPath.then(generatePathString,console.log("storage local can not find key primaryPath"));

function generatePathString(){
	if(primaryPath.indexOf("\\") == 0 || primaryPath.indexOf("\/") == 0){
		primaryPath = primaryPath.subString(1,primaryPath.length);
	}
	window.open(originStr + "\/" + primaryPath);
}