var listname = "SampleTest";
$(document).ready(function () {
    $("#btnSubmit").click(function(){
        saveSampleTest();
    });
});

function saveSampleTest(){
    // var listname="SampleTest";
    var itemType = GetListItemType(listname);
    var item = {
        "_metadata": { "type": itemType },
        "FirstName": $("#textfn").val(),
        "SecondName": $("#textsn").val(),
        "Gender": $("#textgender").val()
    };
    var requesturl=_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getByTitle('"+listname+"')/items";


    $.ajax({
        url: requesturl,
        type: "post",
        contentType: "appliction/json; odata=verbose",
        data: JSON.stringify(item),
        header: {
            "Accept": "appliction/json; odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: onSuccess,
        error: onError
    });
    function onSuccess(data){
        alert("Item  Created");
        $("#txtfn").val();
    }
    function onError(error){
        alert('error' + error);
    }
}

function GetListItemType(name){
    return "SP.data." + name.charAt(0).toUpperCase() + name.slice(1) + "Listitem";
}