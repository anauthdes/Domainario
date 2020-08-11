chrome.browserAction.onClicked.addListener(function(tab) {

    //sets default options
    var defaultPath = "/login";
    var defaultCase = false;
    var defaultAppend = false;
    var exceptionCollection = [];
    var cURL = tab.url;
    var nURL = "";

    //pulling the saved options for the user browser
    chrome.storage.sync.get({
        defaultPath: "/login",
        defaultCase: false,
        defaultAppend: false,
        exceptionCollection: []
    }, function(items) {
        defaultPath = items.defaultPath;
        defaultCase = items.defaultCase;
        defaultAppend = items.defaultAppend;
        exceptionCollection = items.exceptionCollection;
        console.log(defaultPath, defaultCase, defaultAppend, exceptionCollection, cURL, nURL);
        try{
            window.open(generateNewURL());
        }catch(e){
            console.log("Error on: ", e);
        }
    });

    //Returns the host domain
    function getDomain(currentURL) {
        var newURL = "";
        if (currentURL.charAt(currentURL.length - 1) == '\/' || currentURL.charAt(currentURL.length - 1) == '\\') {
            currentURL.slice(-1);
        }
        newURL = /(http(s|S)?:(\/|\\){2}).*[.][\w]{2,6}((\\|\/){1}?)/i.exec(currentURL);

        if (newURL == null) {
            newURL = /(http(s|S)?:(\/|\\){2}).*[.][\w]{2,6}((\\|\/){1}?)/i.exec((currentURL + '\/'));
        }
        return newURL;
    }

    //cleans and appends results
    function cleanResult(ori, res, trimChar, insertifNo) {
        if (ori.length > 0 && res.length > 0) {

            for (var iii = 0; iii < trimChar.length; iii++) {
                if (res.charAt(0) == trimChar[iii] && ori.charAt(ori.length - 1) == trimChar[iii]) {
                    return (ori + res.slice(1));
                } else if (!res.charAt(0) == trimChar[iii] && !ori.charAt(ori.length - 1) == trimChar[iii] && insertifNo) {
                    return (ori + trimChar[iii] + res);
                }
            }
        }
        return (ori + res);
    }

    //generates resulting URL and returns as string based on saved conditions
    function generateNewURL() {
        if (exceptionCollection.length > 0) {
            //look for exceptions first otherwise skip right to default
            for (var iii = 0; iii < exceptionCollection.length; iii++) {
                // First check if the url matches the exception 
                var isException = false;
                if (exceptionCollection[iii].case) {
                    if (cURL.indexOf(exceptionCollection[iii].exception) >= 0) {
                        isException = true;
                    }
                } else {
                    if (cURL.toLowerCase().indexOf(exceptionCollection[iii].exception.toLowerCase()) >= 0) {
                        isException = true;
                    }
                }
                if (isException) {
                    //set the url and the result in 2 parts
                    nURL = cURL;
                    var res = exceptionCollection[iii].result;

                    //if you are swapping out text in URL modify here
                    if (exceptionCollection[iii].exact) {
                        nURL = nURL.replace(exceptionCollection[iii].exception, res)
                    }
                    //if you are not appending and not swapping out text modify URL to be host and result
                    if (!exceptionCollection[iii].append && !exceptionCollection[iii].exact) {
                        if (res.charAt(0) == "\/" || res.charAt(0) == "\\") {
                            nURL = cleanResult(getDomain(nURL)[0], res, ["\/", "\\"], true);
                        } else {
                            nURL = (getDomain(nURL)[0] + res);
                        }
                        //if you are not appending but swapping out text leave URL as is
                    } else if (!exceptionCollection[iii].append && exceptionCollection[iii].exact) {
                        nURL = nURL;
                        //otherwise append
                    } else {
                        nURL = (nURL + res);
                    }
                    return nURL;
                }
            }

        }

        //default runs if nothing has been returned
        if (defaultAppend && defaultCase) {
            if (defaultPath.charAt(0) == "\/" || defaultPath.charAt(0) == "\\") {
                return cleanResult(cURL, defaultPath, ["\/", "\\"], true);
            } else {
                return (cURL + defaultPath);
            }
        } else if (defaultAppend && !defaultCase) {
             if (defaultPath.charAt(0) == "\/" || defaultPath.charAt(0) == "\\") {
                return cleanResult(cURL, defaultPath.toLowerCase(), ["\/", "\\"], true);
            } else {
                return (cURL + defaultPath.toLowerCase());
            }
        } else if (!defaultAppend && defaultCase) {
            if (defaultPath.charAt(0) == "\/" || defaultPath.charAt(0) == "\\") {
                return cleanResult(getDomain(cURL)[0], defaultPath, ["\/", "\\"], true);
            } else {
                return (getDomain(cURL)[0] + defaultPath);
            }

        } else {
            if (defaultPath.charAt(0) == "\/" || defaultPath.charAt(0) == "\\") {
                return cleanResult(getDomain(cURL)[0], defaultPath.toLowerCase(), ["\/", "\\"], true);
            } else {
                return (getDomain(cURL)[0] + defaultPath.toLowerCase());
            }
        }
        //fail-safe
        return cURL;
    }
});