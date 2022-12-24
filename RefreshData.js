function refreshData() {
  SpreadsheetApp.flush()
    refreshData1()
    refreshData2()
    refreshData3()
}
  
function refreshData1 () {

// Load sheet with variable
    
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Utility');
  var cell = sheet.getRange('Utility!B3');
  var cell2 = sheet.getRange('Utility!C3');
  
//Change Value To 0
    
    cell.setValue(0);
    cell2.setValue(0);

}

function refreshData2(){

//Load sheet with variable

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Utility');
  var cell = sheet.getRange('Utility!B3');

//Time delay before changing back
  
    Utilities.sleep(2000)
  
//Set Value Back to 1
  
    cell.setValue(1);
  
}

function refreshData3(){

//Load sheet with variable

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Utility');
  var cell2 = sheet.getRange('Utility!C3');

//Time delay before changing back
  
    Utilities.sleep(2000)
  
//Set Value Back to 1
  
    cell2.setValue(1);
  
}
