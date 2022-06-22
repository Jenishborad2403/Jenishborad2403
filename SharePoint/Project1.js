function CreateListItem() {
    $ajax
        ({
            url: _spPageContexInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('NewList')/Items",
            type: "POST",
            Headers:
            {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "x-RequestDiges": $("#_REQUESTDIGEST").val()
            },
            data: JSON.stringify
                ({
                    __metadata:
                    {
                        type: "SP.Data.New_x0020_ListListItem"
                    },
                    Title: "New Title"
                }),

            Function(data, status, xhr) {
                console.log("Success");
            },
            Function(xhr, error, error) {
                console.log("Faild");
            }
        });
}