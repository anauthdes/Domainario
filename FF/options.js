//options JS
document.getElementById("submit").addEventListener("click",setPrimary(e));

function setPrimary(e){
	e.preventDefault();
	var pathString = document.getElementById("primary_path").value;	

	storage.local.set(
			primaryPath : pathString.toString(),
		);
	alert("Path Saved : ",pathString);
}