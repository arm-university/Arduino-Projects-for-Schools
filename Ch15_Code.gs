//---------------------------------------------
// Based on code by Mogsdad@Stackoverflow,
// jarkomdityaz.appspot.com and Stephen Borsay
//---------------------------------------------

//Receives parameters on query string and inserts
//in order.

//Add data to spreadsheet on next available row
function doGet(e) {
  var result = 'Ok'; //assume success
  if (e.parameter == undefined) {
    result = 'No parameters provided';
  } else {
    var id = '1CVGec5xXlETGp_40KD-6xIwmuYfIz1lKGQpMLrYayog';
    var sheet = SpreadsheetApp.openById(id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rowData = [];
    rowData[0] = ""; //Leave blank for name
    for (var param in e.parameter) {
      var value = stripQuotes(e.parameter[param]);
    }
    Logger.log("Here");
    Logger.log(value);
    var datapoints = [{}];
    datapoints = value.split(",");
    Logger.log(datapoints);
    for (var dp in datapoints) {
      rowData.push(datapoints[dp]);
    }
    var newRange = sheet.getRange(newRow,1,1,rowData.length);
    newRange.setValues([rowData]); //Write the new row to the sheet
  }
  return ContentService.createTextOutput(result);
}

function stripQuotes(value) {
  return value.replace(/^["']|['"]$/g, "");
}
