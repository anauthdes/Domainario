chrome.browserAction.onClicked.addListener(function(tab) {

    
    //sets default options
    const IDENTIFYERS = ['\\', '\/'];
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
    });

    console.log(defaultPath, defaultCase, defaultAppend, exceptionCollection, cURL, nURL);
    window.open(generateNewURL());




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

    function generateNewURL() {
        if (exceptionCollection.length > 1) {
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
                        nURL = (getDomain(nURL)[0] + res);
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

        } else {
            if (defaultAppend && defaultCase) {
                return (cURL + defaultPath);
            } else if (defaultAppend && !defaultCase) {
                return (cURL + defaultPath.toLowerCase());
            } else if (!defaultAppend && defaultCase) {
                return (getDomain(cURL)[0] + defaultPath);
            } else {
                return (getDomain(cURL)[0] + defaultPath.toLowerCase());
            }
        }

        return cURL;
    }



});