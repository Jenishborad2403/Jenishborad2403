$(document).ready(function () {
    ExecuteOrDelayUntilScriptLoaded(retrieveListItems, "sp.js");
    $("#btnUpdate").click(function () {
        updateListItemByID();
    });
});
var masterListItem;
function retrieveListItems() {
    var id = GetParameterValues('MyID');
    getitemsbyID(id);
}
function getitemsbyID(itemID) {
    var clientContext = new SP.ClientContext.get_current();
    var masterlist = clientContext.get_web().get_lists().getByTitle('CmpanyInfoList');
    masterListItem = masterlist.getItemById(itemID);
    clientContext.load(masterListItem);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed));
}
function onQuerySucceeded() {
    $("#usrtxt").val(masterListItem.get_item('Title'));
    $("#usrpwd").val(masterListItem.get_item('Password'));
    $("#usrid").val(masterListItem.get_item('EmailID'));
    $("#addtxt").html(masterListItem.get_item('Address'));
    if (masterListItem.get_item('Gender') == "Male") {
        $("#gen0").attr('checked', 'checked');
    }
    else if (masterListItem.get_item('Gender') == "Female") {
        $("#gen1").attr('checked', 'checked');
    }
    $("#dropcount").val(masterListItem.get_item('Country'));
    var now = new Date();
    var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    $('#SubmDate').val(today);
}
function onQueryFailed(sender, args) {
    alert('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}
function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}
function updateListItemByID() {
    var id = GetParameterValues('MyID');
    var username = $("#usrtxt").val();
    var password = $("#usrpwd").val();
    var emailId = $("#usrid").val();
    var address = $("#addtxt").val();
    var gender = $("input[name='gender']:checked").val();
    var country = $("#dropcount option:selected").text();
    var myDate = new Date($("input[title='Submitdate']").val());
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('CmpanyInfoList');
    var oListItem = oList.getItemById(id);
    oListItem.set_item('Title', username);
    oListItem.set_item('Password', password);
    oListItem.set_item('EmailID', emailId);
    oListItem.set_item('Address', address);
    oListItem.set_item('Gender', gender);
    oListItem.set_item('Country', country);
    oListItem.set_item('SubmissionDate', myDate);
    oListItem.update();
    clientContext.executeQueryAsync(Function.createDelegate(this, this.success), Function.createDelegate(this, this.failue));
}
function success() {
    alert('Item updated!');
}
function failue(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}