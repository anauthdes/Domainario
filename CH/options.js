//Options script

function getExceptionsArray(exceptions,results,exacts,cases){
	var compiledItems = [];
	for(var iii=0;iii < exceptions.length; iii++){
		compiledItems[iii] = {
			exception:exceptions[iii].value,
			result:results[iii].value,
			exact: exacts[iii].checked,
			case: cases[iii].checked,
		};
	}
	return compiledItems;
}
function generateExceptionElements(exceptionCollection,container){
	//check if the collection is empty before making changes
	if(exceptionCollection.length > 0){
		var exceptionsString ="";
		document.getElementById('exception-builds').innerHTML = "";
		for (var iii = 0; iii < exceptionCollection.length; iii++) {
			exceptionsString += '<div class="segment">' +
									'<input type="text" name="exception-path" class="exception-path-contains"  placeholder="/sx.dev.env" value="' + exceptionCollection[iii].exception + '">' +
									'<input type="text" name="exception-result" class="exception-path-result" placeholder="/sx.prod.env" value="' + exceptionCollection[iii].result + '">' + 
									'<input type="checkbox" name="exception-exact" class="exception-exact" checked="' + exceptionCollection[iii].exact + '">'+
									'<input type="checkbox" name="exception-case" class="exception-case" checked="' + exceptionCollection[iii].case + '">' +
									'<div class="delete-exception">DELETE</div>' +
								'</div>';
		}
		document.getElementById(container).innerHTML = exceptionsString;
	}
}

function addNewException(container){
	var newElement = document.createElement("DIV");
	newElement.classList.add("segment");
	newElement.innerHTML = '<div class="segment">' +
									'<input type="text" name="exception-path" class="exception-path-contains"  placeholder="/sx.dev.env" >' +
									'<input type="text" name="exception-result" class="exception-path-result" placeholder="/sx.prod.env"> ' + 
									'<input type="checkbox" name="exception-exact" class="exception-exact" >'+
									'<input type="checkbox" name="exception-case" class="exception-case" >' +
									'<div class="delete-exception">DELETE</div>' +
								'</div>';
	document.getElementById(container).appendChild(newElement);
}
function deleteException(item){
	item.target.parentElement.remove();
}

function save_options() {
  var defaultPath = document.getElementById('default-replace').value;
  var defaultCase = document.getElementById('default-case').checked;
  var exceptionCollection = getExceptionsArray(document.getElementsByClassName("exception-path-contains"),document.getElementsByClassName("exception-path-result"),document.getElementsByClassName("exception-exact"),document.getElementsByClassName("exception-case"));
  chrome.storage.sync.set({
    defaultPath: defaultPath,
    defaultCase: defaultCase,
    exceptionCollection: exceptionCollection
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    defaultPath: "/login",
    defaultCase: false,
    exceptionCollection: []
  }, function(items) {
  	document.getElementById('default-replace').value = items.defaultPath;
  	document.getElementById('default-case').checked = items.defaultCase;
    generateExceptionElements(items.exceptionCollection,"exception-builds");
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
document.getElementById('add-exception').addEventListener('click',function(){addNewException("exception-builds")});
document.getElementsByClassName('delete-exception').addEventListener('click',deleteException);