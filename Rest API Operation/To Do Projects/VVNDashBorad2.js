
	JSRequest.EnsureSetup()
	$(document).ready(function () {
		$('#dtStart').val(moment().format("YYYY-MM-DD"))
		$('#dtEnd').val(moment().format("YYYY-MM-DD"))
		
		$("#dtMonth").datepicker({
        dateFormat: 'MM yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,

        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('MM yy', new Date(year, month, 1)));
        }
		});

		$("#dtMonth").focus(function () {
			$(".ui-datepicker-calendar").hide();
			$("#ui-datepicker-div").position({
				my: "center top",
				at: "center bottom",
				of: $(this)
			});
		});
	
		setTimeout(function () {
			SetFullScreenMode(true);
		}, 500);
		var now = new Date();
		var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
		var PreviousMonthISOString = prevMonthLastDate.getFullYear() + "-" + (prevMonthLastDate.getMonth() + 1) + "-" + prevMonthLastDate.getDate() ;
		
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
		var firstDay = y + "-" + (m + 1) + "-" +  1;
		var lastDay = y+ "-" + (m + 1)+ "-" +  lastDate.getDate();
		$("#dtMonth").val($.datepicker.formatDate('MM yy', new Date(now.getFullYear(), now.getMonth(), 1)));
		GetCurrentMonthOpenBal(PreviousMonthISOString, firstDay, lastDay );
	});
	var monthOpenBalance = [];
	var allData = [];
	var allEmployees = [];
	var lstStudentVisaMaster = "Student Visa Master"
	
	function GetCurrentMonthOpenBal(PreviousMonthISOString, firstDay, lastDay )
		{
			try{
			
				$.getJSON("https://outsourceindia.sharepoint.com/sites/Marketing/_api/web/lists/getbytitle('VVNBal')/items?$filter=Date eq '"+ PreviousMonthISOString	 + "'",
					function (data) {
						if (data.value.length > 0) {
							var item = data.value[0];
							monthOpenBalance = item.Bal
							GetDateOpenBal(firstDay, lastDay );
						}
					},
					function (err) { console.log(err) });
			
				
			} catch (e) {
				console.log("Error in GetCurrentMonthOpenBal " + e);
			}
		}
		
		function GetDateOpenBal(firstDay, lastDay)
		{
			try{
				
				$.getJSON("https://outsourceindia.sharepoint.com/sites/Marketing/_api/web/lists/getbytitle('VVN')/items?$top=5000&$filter=DateOfTransaction ge '"+ firstDay + "' and DateOfTransaction le '"+ lastDay + "'",
					function (data) {
						var openBal = 0;
						if (data.value.length > 0) {
							allData = data.value;
							bindDataTable(allData)
						}
					},
					function (err) { console.log(err) });
			} catch (e) {
				console.log("Error in GetDateOpenBal " + e);
			}
		}

	function bindDataTable(allData) {
		
		//var newTR = "<tr id='ExtraTR' style='background-color: #5588ac;color: white;font-weight: bold;'><td colspan='5'>Month's Opening Balance : " + numberWithCommas(monthOpenBalance) + "</td><td style='display: none;'></td><td style='display: none;'></td><td style='display: none;'></td><td style='display: none;'></td><tr>"
		//$('#tblPayments').append(newTR);
		var table = $('#tblPayments').DataTable({ 
			'rowCallback': function(row, data, index){
		    var no = 5;
		    if(data[no] == 'Pending'){
		        $(row).find('td:eq('+no+')').css('background-color', 'red');
		        $(row).find('td:eq('+no+')').css('color', 'white');
		    }
			else if(data[no] == 'Verified'){
		        $(row).find('td:eq('+no+')').css('background-color', 'green');
		        $(row).find('td:eq('+no+')').css('color', 'white');
		    }
			else if(data[no] == 'Query Raised'){
		        $(row).find('td:eq('+no+')').css('background-color', 'orange');
		        $(row).find('td:eq('+no+')').css('color', 'white');
		    }
			else if(data[no] == 'Query Verified'){
		        $(row).find('td:eq('+no+')').css('background-color', 'green');
		        $(row).find('td:eq('+no+')').css('color', 'white');
		    }
		    
		  }
		   
		});
		table.clear().draw();
		
		getRowsForTable(table, allData);
		table.search('').columns().search('').draw();
		$('#tblPayments').dataTable().api().order([[0, "asc"]]);
		
		//$('#tblPayments').dataTable().api().buttons(['copy', 'csv', 'excel', 'pdf', 'print'])
		$('#tblPayments').dataTable().api().draw()
		//$('#tblPayments').dataTable().api().columns(0).visible(false)
	}

	

	function dateFormat(isoDate)
	{
		date = new Date(isoDate);
		year = date.getFullYear();
		month = date.getMonth()+1;
		dt = date.getDate();

		if (dt < 10) {
		  dt = '0' + dt;
		}
		if (month < 10) {
		  month = '0' + month;
		}
		var dateValue = dt + "-" + month + "-" + year;
		
		return dateValue;
	}

	function getRowsForTable(table, allData){
		
		for (i = 0; i < allData.length; i++) {
			var item = allData[i];

			var Date = dateFormat(item.DateOfTransaction);
			var InValue = numberWithCommas(item.InValue);
			var OutValue = numberWithCommas(item.OutValue);
			
			if(item.InValue == 0) {
				if(item.OutValue != 0)
				{
					monthOpenBalance -= item.OutValue
				}
			} else {
			
				if(item.InValue != 0)
				{
					monthOpenBalance += item.InValue
				}
			}
								
			var Balance = numberWithCommas(monthOpenBalance);
			var Particulars = item.Particulars
			var status = item.Status
			var QueryStatement = item.QueryStatement
			var ResolutionStatement = item.ResolutionStatement
			table.row.add([
				Date,
				InValue,
				OutValue,
				Balance,
				Particulars,
				status,
				QueryStatement,
				ResolutionStatement
			]).draw(false);
		}
	}
	
	function numberWithCommas(x) {
			return x.toString().split('.')[0].length > 3 ? x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3): x.toString();
		}

	function applyFilter() {
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var filterVal = $("#dtMonth").val();
		filterVal = filterVal.split(" ")
		var date = new Date(filterVal[1], monthNames.indexOf(filterVal[0]), 1), y = date.getFullYear(), m = date.getMonth();
		var lastDate = new Date(filterVal[1], monthNames.indexOf(filterVal[0]) + 1, 0)
		var previousLastDate = new Date(filterVal[1], monthNames.indexOf(filterVal[0]), 0)
		var currentfirstDay = y + "-" + (m + 1) + "-" +  1;
		var currentlastDay = y+ "-" + (m + 1)+ "-" +  lastDate.getDate();
		if(m == 0)
		{
			m = 12;
			y = y - 1;
		}

		var previouslastDay = y+ "-" + (m)+ "-" +  previousLastDate.getDate();
		var table = $('#tblPayments').DataTable();
		table.clear().draw();
		table.destroy();
		GetCurrentMonthOpenBal(previouslastDay, currentfirstDay, currentlastDay );
		
	}
	function resetFilter() {
		var now = new Date();
		var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
		var PreviousMonthISOString = prevMonthLastDate.getFullYear() + "-" + (prevMonthLastDate.getMonth() + 1) + "-" + prevMonthLastDate.getDate() ;
		
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
		var firstDay = y + "-" + (m + 1) + "-" +  1;
		var lastDay = y+ "-" + (m + 1)+ "-" +  lastDate.getDate();
		$("#dtMonth").val($.datepicker.formatDate('MM yy', new Date(now.getFullYear(), now.getMonth(), 1)));
		var table = $('#tblPayments').DataTable();
		table.clear().draw();
		table.destroy();
		GetCurrentMonthOpenBal(PreviousMonthISOString, firstDay, lastDay );
	}
	
	function rebindDataTable(allData){
		var table = $('#tblPayments').DataTable();
		table.clear().draw();
		getRowsForTable(table, allData);
	}
	