var listName = "Employee";
$(document).ready(function () {
    $("#btn").click(function () {
        CreateListItem();
    });
});

// function submit(e) {
//     //Prevent a submit
//     e.preventDefault();
// }

function CreateListItem() {
    var itemType = GetItemTypeForListName(listName);
    var name = $("#txtName").val();
    var employeeID = $("#txtEmployeeID").val();
    var department = $("#slctDepartment").val();
    var city = $("#txtCity").val();
    var contactNumber = $("#txtContactNumber").val();

    var item = {
        "__metadata": { "type": itemType },
        "Title": name,
        "Employee_x0020_ID": employeeID,
        "Department": department,
        "City": city,
        "Contact_x0020_Number": contactNumber
    };

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        // data: JSON.stringify({
        //     '__metadata': {'type':'SP.Data.EmployeeListItem'},
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            alert("success");
        },
        error: function (data) {
            alert("success");
        }
    });
}
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}  
