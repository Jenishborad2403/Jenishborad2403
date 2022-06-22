/***********************************
 * REST API - INSERT item into SharePoint
 * 
 * 
 */
 window.addEventListener('DOMContentLoaded', function (event) {
    //Add eventlistener
    var btn = getEl("btn")
    btn.addEventListener("click", submit)
})

function submit(e) {
    //Prevent a submit
    e.preventDefault();

    //Store form values
    var name = getEl("#txtName")
    var employeeID = getEl("#txtEmployeeID")
    var department = getEl("#slctDepartment")
    var city = getEl("#txtCity")
    var contactNumber = getEl("#txtContactNumber")

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists/GetByTitle('Employee')/items";

    $.ajax({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.Data.EmployeeListItem' },
            'Title':name.value,
            'Employee_x0020_ID': employeeID.value,
            'Department': department.value,
            'City': city.value,
            'Contact_x0020_Number':contactNumber.value
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