// ----------------------------------------------------------------------------------------------------------
// Retrieve list items using Rest API
// ----------------------------------------------------------------------------------------------------------
function retriveListItem()
{
    $.ajax
    ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('companyInfo')/items?$select=Company,Industry",
        type: type,
        data: data,
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": null
        },
        cache: false,
        success: function(data)
        {
            $("#ResultDiv").empty();
            for (var i = 0; i < data.d.results.length; i++)
            {
                var item = data.d.results[i];
                $("#ResultDiv").append(item.Company + "\t" + item.Industry + "<br/>");
            }
        },
        error: function(data)
        {
            $("#ResultDiv").empty().text(data.responseJSON.error);
        }
    });
}
// ----------------------------------------------------------------------------------------------------------
// Create list item using Rest API
// ----------------------------------------------------------------------------------------------------------
function AddListItem()
{
    var industryVal = $("#Industry").val();
    var Company = $("#Company").val();
    $.ajax
        ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('companyInfo')/items",
        type: "POST",
        data: JSON.stringify
        ({
            __metadata:
            {
                type: "SP.Data.TestListItem"
            },
            Company: Company,
            Industry: industryVal
        }),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method": "POST"
        },
        success: function(data, status, xhr)
        {
            retriveListItem();
        },
        error: function(xhr, status, error)
        {
            $("#ResultDiv").empty().text(data.responseJSON.error);
        }
    });
}
// ----------------------------------------------------------------------------------------------------------
// Update list item using Rest API
// ----------------------------------------------------------------------------------------------------------
function updateListItem()
{
    var industryVal = $("#Industry").val();
    $.ajax
    ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('companyInfo')/items(7)", // list item ID
        type: "POST",
        data: JSON.stringify
        ({
            __metadata:
            {
                type: "SP.Data.TestListItem"
            },
            Industry: industryVal
        }),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function(data, status, xhr)
        {
            retriveListItem();
        },
        error: function(xhr, status, error)
        {
            $("#ResultDiv").empty().text(data.responseJSON.error);
        }
    }); 
}
// ----------------------------------------------------------------------------------------------------------
// Create list item using Rest API
// ----------------------------------------------------------------------------------------------------------
function deleteListItem()
{
    $.ajax
    ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('companyInfo')/items(7)",
        type: "POST",
        headers:
        {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function(data, status, xhr)
        {
            retriveListItem();
        },
        error: function(xhr, status, error)
        {
            $("#ResultDiv").empty().text(data.responseJSON.error);
        }
    });
}
