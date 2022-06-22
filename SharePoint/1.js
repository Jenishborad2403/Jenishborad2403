//^^^js
//getlistData("https://outsourceindia.sharepoint.com/_api/Lists")//.then(t=>console.log(t))
function getlistData(reqUrl) {
    return fetch(reqUrl, {
        method: "GET",
        credentials: "include",
        header: {
            Accept: "Application/json; odata=nometadata"
        }
    });
};
// Get REquest Digest
var getRequestDigest = function (rootUrl) {
    //request using fetch api
    return fetch(rootUrl + "/_api/contexinfo", {
        method: "post",
        credentials: "include",
    //    getlistData,
        headers: {
            Accept: "appliction/json; odata=nometadata",
            "content-type": "application/json; odata=nometadata"
        },
        body: undefined
    })
};

//------------------------------------------------------------------------------------
// CreateNewList("https://outsourceindia.sharepoint.com/_api/Listes","TEST LIST")

var createNewList = function (requrl, listname) {
    return getRequestDigest(reqUrl.split("_api")[0]).then(function (digest) {
        console.log("Received Request Diegest", digest.formDigestValue);
        //Request using Fetch API
        return fetch(requrl, {
            method: "post",
            credentials: "include",
            headers: {
                Accept: "appliction/json; odata=nometadata",
                "content-type": "application/json; odata=nometadata",
                "X-RequestDigest": digest.formDigestValue
            },
            body: JSON.stringify({
                Title: listname
                , BaseTemplate: 100
            })
        });
    });
};
