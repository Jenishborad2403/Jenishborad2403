window.addEventListener('DOMContentLoaded', function (event) {
    //Add eventlistener
    var btn = getEl("btn")
    btn.addEventListener("click", submit)
})

function submit(e) {
    e.preventDefault();

    var name = getEl("name")
    var sname = getEl("SecondName");

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var myUrl = siteUrl + "/_api/web/lists/getByTitle('Test')/items";

    $.ajax({
        url: myUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.Data.TestListItem' },
            'Title': name.value,
            'Second Name': sname.value
        }),
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: onQuerySucceeded,
        error: onQueryFailed
    });
}

function getEl(el) {
    return document.getElementById(el)
} 

function onQuerySucceeded() {
    alert("Your item has been submited")
}

function onQueryFailed() {
    alert("Your item did not submit.  Please see the administrator")
}
