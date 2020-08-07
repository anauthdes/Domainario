//Options script

function getExceptionsArray(exceptions, results, exacts, cases, appends) {
    var compiledItems = [];
    for (var iii = 0; iii < exceptions.length; iii++) {

        compiledItems[iii] = {
            exception: exceptions[iii].value,
            result: results[iii].value,
            exact: exacts[iii].checked,
            case: cases[iii].checked,
            append: appends[iii].checked
        };
    }
    return compiledItems;
}

function generateExceptionElements(exceptionCollection, container) {
    //check if the collection is empty before making changes
    if (exceptionCollection.length > 0) {
        var exceptionsString = "";
        document.getElementById('exception-builds').innerHTML = "";
        for (var iii = 0; iii < exceptionCollection.length; iii++) {
            console.log(exceptionCollection[iii]);
            exceptionsString += '<div class="segment"><div class="segment">' +
                '<div class="segment-item"><input type="text" name="exception-path" class="exception-path-contains"  placeholder="/sx.dev.env" minlength="1" value="' + exceptionCollection[iii].exception + '"></div>' +
                '<div class="segment-item"><input type="text" name="exception-result" class="exception-path-result" placeholder="/sx.prod.env" value="' + exceptionCollection[iii].result + '"></div> ' +
                '<div class="segment-item"><input type="checkbox" name="exception-exact" class="exception-exact" ' + (exceptionCollection[iii].exact ? "checked='true'" : "") + '></div>' +
                '<div class="segment-item"><input type="checkbox" name="exception-case" class="exception-case"' + (exceptionCollection[iii].case ? "checked='true'" : "") + '></div>' +
                '<div class="segment-item"><input type="checkbox" name="exception-append" class="exception-append" ' + (exceptionCollection[iii].append ? "checked='true'" : "") + '></div>' +
                '<div class="segment-item"><div class="delete-exception"></div>' +
                '</div></div></div>';
        }
        document.getElementById(container).innerHTML = exceptionsString;
        //add delete event listener
        var del = document.getElementsByClassName('delete-exception')
        for (var iii = 0; iii < del.length; iii++) {
            del[iii].addEventListener('click', function(e) { deleteException(e) });
        }
    }
}

function addNewException(container) {
    var newElement = document.createElement("DIV");
    newElement.classList.add("segment");
    newElement.innerHTML = '<div class="segment">' +
        '<div class="segment-item"><input type="text" name="exception-path" class="exception-path-contains"  placeholder="/sx.dev.env" minlength="1"></div>' +
        '<div class="segment-item"><input type="text" name="exception-result" class="exception-path-result" placeholder="/sx.prod.env"></div> ' +
        '<div class="segment-item"><input type="checkbox" name="exception-exact" class="exception-exact" ></div>' +
        '<div class="segment-item"><input type="checkbox" name="exception-case" class="exception-case" ></div>' +
        '<div class="segment-item"><input type="checkbox" name="exception-append" class="exception-append"></div>' +
        '<div class="segment-item"><div class="delete-exception"></div></div>' +
        '</div>';
    document.getElementById(container).appendChild(newElement);
    document.getElementsByClassName('delete-exception')[document.getElementsByClassName('delete-exception').length - 1].addEventListener('click', function(e) { deleteException(e) });
}

function deleteException(item) {
    item.target.parentNode.parentNode.remove();
}

function save_options() {
    var defaultPath = document.getElementById('default-replace').value;
    var defaultCase = document.getElementById('default-case').checked;
    var defaultAppend = document.getElementById('default-append').checked;
    if (validateExceptions(document.getElementsByClassName("exception-path-contains")) != "") {
        var status = document.getElementById('status-error');
            status.textContent = 'Errors on exceptions. Changes not saved';
            setTimeout(function() {
                status.textContent = '';
            }, 1000);
    } else {

        var exceptionCollection = getExceptionsArray(document.getElementsByClassName("exception-path-contains"), document.getElementsByClassName("exception-path-result"), document.getElementsByClassName("exception-exact"), document.getElementsByClassName("exception-case"), document.getElementsByClassName("exception-append"));
        chrome.storage.sync.set({
            defaultPath: defaultPath,
            defaultCase: defaultCase,
            defaultAppend: defaultAppend,
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
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        defaultPath: "/login",
        defaultCase: false,
        defaultAppend: false,
        exceptionCollection: []
    }, function(items) {
        document.getElementById('default-replace').value = items.defaultPath;
        document.getElementById('default-case').checked = items.defaultCase;
        document.getElementById('default-append').checked = items.defaultAppend;
        generateExceptionElements(items.exceptionCollection, "exception-builds");
    });
}

function validateExceptions(exceptions) {
    var validation = "";
    for (var i = 0; i < exceptions.length; i++) {
        if(exceptions[i].value.length < 1){
            validation += exceptions[i].name;
            exceptions[i].classList.add("error");
        }else{
            exceptions[i].classList.remove("error");
        }
    }
    return validation;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add-exception').addEventListener('click', function() { addNewException("exception-builds") });
var del = document.getElementsByClassName('delete-exception')
for (var iii = 0; iii < del.length; iii++) {
    del[iii].addEventListener('click', function(e) { deleteException(e) });
}