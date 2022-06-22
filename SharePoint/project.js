var listname = "Project";
$(document).ready(function(){
    $("btnSubmit").click(function(){
        saveProject();
    });
});

function saveProject(){
    var itemtype = GetListItemType(listname);
    var item = {
        "__metadata":{"type":itemtype},
        "Title":$("#txtFirstName").val(),
        "SecondName":$("#txtSecondName").val()
    };

    var requesturl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items";

    $.ajx({
        url:requesturl,
        type:"POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        Headers:{
            "Accept": "appliction/json; odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: onSuccess,
        error: onError
    });
    function onSuccess(data){
        alert("Item Created");
        $("#txtFirstName").val();
    }
    function onError(error){
        alert('error' + error);
    }
}

function GetListItemType(name){
    return "SP.data." + name.charAt(0).toUpperCase() + name.slice(1) + "Listitem";
}