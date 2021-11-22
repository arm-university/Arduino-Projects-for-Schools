//---------------------------------------------
// Based on code byWe  Mogsdad@Stackoverflow,
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
    var id = 'enter sheet reference here';
    var sheet = SpreadsheetApp.openById(id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rowData = []
    rowData[0] = new Date(); //Add the timestamp in to column A
    for (var param in e.parameter) {
      var value = stripQuotes(e.parameter[param]);
      rowData[rowData.length] = value; //Add parameter to rowData
    }
    var newRange = sheet.getRange(newRow,1,1,rowData.length);
    newRange.setValues([rowData]); //Write the new row to the sheet
  }
  return ContentService.createTextOutput(result);
}

function stripQuotes(value) {
  return value.replace(/^["']|['"]$/g, "");
}
