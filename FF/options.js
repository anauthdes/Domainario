//options JS
document.getElementById("submit").addEventListener("click",setPrimary(e));

function setPrimary(e){
	e.preventDefault();
	var pathString = document.getElementById("primary_path").value;	

	storage.local.set(primaryPath : pathString.toString());
	console.log(pathString.toString());
	alert("Path Saved : ",pathString);
}


var pathList = document.getElementById("cPath");
var text = storage.local.get("primaryPath");

pathList.texContent = text;