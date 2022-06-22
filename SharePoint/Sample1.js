var listname="Project";
$(document).ready(function(){
    $("#btnsubmit").click(function(){
        saveSampleTest();
    });
});

function saveSampleTest(){
    var listname="SampleTest";
    var itemType = GetListItemType(listname);
    var item ={
        "__metadata":{"type":itemType},
        "Title":$("#txtFirstName").val(),
        "SecondName":$("#txtSecondName").val()
    };
    var requesturl =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle("+ listname +")/items";

    $.ajax({
        url: requesturl,
        type: "post",
        contentType: "appliction/json; odata=verbose",
        data: JSON.stringify(item),
        header:{
            "Accept": "appliction/json; odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: onSuccess,
        error: onError
    });

    function onSuccess(data){
        alert("Item  Created");
        $("#txtFirstName").val();
    }
    function onError(error){
        alert('error' + error);
    }
}

function GetListItemType(name){
    return "SP.data." + name.charAt(0).toUpperCase() + name.slice(1) + "Listitem";
}