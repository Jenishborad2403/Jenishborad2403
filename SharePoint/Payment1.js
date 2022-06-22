window.addEventListener('DOMConntentLoaded', function (event) {
    var btnSaveALL = getEL("btnSaveALL")
    btnSaveALL.addEventListener("Click", Submit)
})

function Submit() {
    e.preventDefault();

    var txtfirst = getEL("txtfirst")

    var sitUrl = _spPageContexInfo.webAbsoluteUrl;
    var fullUrl = sitUrl + "/_api/web/lists/getByTitle('')/items";

    $.ajx({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { type: 'SP.Data.EmployeeListItem'},
            'Title': txtfirst.val,
            // "Middle Name": ,
            // "Last Name": ,
            // "Mobile No": ,
            // "Branch": ,
            // "Email": ,
            // "Remarks": ,
        }),
        headers: {
            "Accept": "appliction/json;odata=verbose",
            "content-type": "appliction/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: onQuerySucceeded,
        error: onQueryFailed
    });
}

function getEL(el) {
    return document.getElementById(el)
}

function onQuerySucceeded() {
    alert("Item Created")
}


