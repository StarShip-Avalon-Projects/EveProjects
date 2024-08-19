/**
 * Version: 1.06
 * Author: CJ Kilman
 * Free to use and modify, Do not remove header.
 * 
 * This script imports SDE_invTypes data from Fuzworks CSV files into a Google Spreadsheet.
 * It includes functions for handling CSV data, managing spreadsheet sheets, and setting named ranges.
 */

/**
 * SED Loader : Runs each SDE update
 * Sample Function
 * It is recodmended to copy this to a different script such as Main.js. Some place to keep your 
 * configeration stuff safe as this file is subject to modifcations.
 */
/** function importSDE()
{
    // Display an alert box with a title, message, input field, and "Yes" and "No" buttons. The
    // user can also close the dialog by clicking the close button in its title bar.
    var ui = SpreadsheetApp.getUi();

    var response = ui.alert('Updating the SDE', 
        'Updating the SDE may take several minutes. In the meantime do not close the window otherwise you will have to restart. Continue?',
        ui.ButtonSet.YES_NO);

        
    // Process the user's response.
    if (response == ui.Button.YES) {

      // Lock Formulas from running
      const haltFormulas = [[0,0]];

      var thisSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
      var loadingHelper= thisSpreadSheet.getRangeByName("'Utility'!B3:C3");
      const  backupSettings = loadingHelper.getValues();
      loadingHelper.setValues(haltFormulas); 

      try{

    const sdePages = [
    /**   new SdePage(
          "SDE_sample",
          "sample.csv",
          [ "sample headers", "These are not required",]
          ),*
        new SdePage(
        "SDE_invTypes",
        "invTypes.csv",
          /** Optional headers,  
           * invTypes is 100+ megabytes. Select Collumns needed to help it laod faster. 
          [ "typeID","groupID","typeName","mass","volume"]
          ),
      ];
      sdePages.forEach(buildSDEs);
        }
    finally{
          // release lock
          loadingHelper.setValues(backupSettings); 
        }

    } else if (response == ui.Button.NO) {
        ui.alert('SDE unchanged.');
    } else {
        ui.alert('SDE unchanged.');
    }

  }*/

/**
 * Downloads and processes the CSV data for the specified SDE page.
 * @param {Object} sdePage - Object containing sheet name, CSV file name, and headers.
 */
function buildSDEs(sdePage) {
  if (sdePage == null) throw "sdePage is required";
  console.time("importSDEinvTypes( sheetName:" + sdePage.sheet + ", csvFile:" + sdePage.csvFile + " )");

  // Download CSV content and convert it to a 2D array.
  const csvContent = downloadTextData(sdePage.csvFile);
  const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  let workSheet = activeSheet.getSheetByName(sdePage.sheet);
  const csvData = CSVToArray(csvContent, ",", sdePage.headers,workSheet.publishedOnly);

  try {

//Bacukup Ranges
    var backedupValues = [];
    if (sdePage.backupRanges != null)
    {
      for (var i = 0; i < sdePage.backupRanges.length; i++) {
        var backupRange = workSheet.getRange(sdePage.backupRanges[i]);

        var formulas = backupRange.getFormulas();
        var values = backupRange.getValues();

        let row = [];
        let cell = [];
        for (var r = 0; r < formulas.length; r++) {
          for (var c = 0; c < formulas[r].length; c++) {
            var formula = formulas[r][c];
            var val = values[r][c];
            if (formula) {
              cell.push(formula);
            }
            else {
                cell.push(val);
            }
          }
          row.push(cell);
          cell = [];
        }
        backedupValues.push(row);
      }
    }
    // Create or clear the sheet for new data.
    workSheet = createOrClearSdeSheet(sdePage.sheet);

    // Write the CSV data to the sheet.
    const destinationRange = workSheet.getRange(1, 1, csvData.length, csvData[0].length);
    destinationRange.setValues(csvData);

    //restore Backups
    if (sdePage.backupRanges != null)
      for (var i = 0; i < sdePage.backupRanges.length; i++) {
        var backupRange = workSheet.getRange(sdePage.backupRanges[i]);
        backupRange.setValues(backedupValues[i]);

      }
    // Remove any blank columns or rows.
    deleteBlankColumnsAndColumns(workSheet);
  } catch (e) {
    throw e;
  }

  console.timeEnd("importSDEinvTypes( sheetName:" + sdePage.sheet + ", csvFile:" + sdePage.csvFile + " )");
}

/**
 * Downloads text data from the given CSV file URL.
 * @param {string} csvFile - Name of the CSV file to download.
 * @returns {string} - The downloaded CSV content.
 */
function downloadTextData(csvFile) {
  console.time("downloadTextData( csvFile:" + csvFile + " )");

  const baseURL = 'https://www.fuzzwork.co.uk/dump/latest/' + csvFile;
  const csvContent = UrlFetchApp.fetch(baseURL).getContentText();

  console.timeEnd("downloadTextData( csvFile:" + csvFile + " )");
  return csvContent.trim().replace(/\n$/, "");
}

/**
 * Creates a new sheet or clears an existing sheet.
 * @param {string} sheetName - Name of the sheet to create or clear.
 * @returns {Sheet} - The created or cleared sheet.
 */
function createOrClearSdeSheet(sheetName) {
  console.time("createOrClearSdeSheet({sheetName:" + sheetName + "})");
  if (!sheetName) throw "sheet name is required;";

  const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  let workSheet = activeSheet.getSheetByName(sheetName);

  // If the sheet exists, clear its contents; otherwise, create a new sheet.
  if (workSheet) {
    workSheet.clearContents();
  } else {
    workSheet = activeSheet.insertSheet();
    workSheet.setName(sheetName);
  }

  console.timeEnd("createOrClearSdeSheet({sheetName:" + sheetName + "})");
  return workSheet;
}

/**
 * Deletes any blank columns or rows from the specified sheet.
 * @param {Sheet} workSheet - The sheet to process.
 */
function deleteBlankColumnsAndColumns(workSheet) {
  if (!workSheet) throw "workSheet not defined";

  const maxColumns = workSheet.getMaxColumns();
  const lastColumn = workSheet.getLastColumn();
  const maxRows = workSheet.getMaxRows();
  const lastRow = workSheet.getLastRow();

  const columnsToRemove = maxColumns - lastColumn;
  const rowsToRemove = maxRows - lastRow;

  if (columnsToRemove > 0) {
    workSheet.deleteColumns(lastColumn + 1, columnsToRemove);
  }
  if (rowsToRemove > 0) {
    workSheet.deleteRows(lastRow + 1, rowsToRemove);
  }
}

/**a
 * Parses a CSV string into a 2D array.
 * @param {string} strData - The CSV string to parse.
 * @param {string} strDelimiter - The delimiter used in the CSV string.
 * @param {Array} headers - Array of headers to filter columns.
 * @param {Boolean} publishedOnly - filters out non published items if this column exists.
 * @returns {Array} - The parsed 2D array.
 */
function CSVToArray(strData, strDelimiter = ",", headers = null, publishedOnly = true) {
    console.time("CSVToArray(strData , strDelimiter = \""+strDelimiter+"\", headers = "+headers+")");

  const skipHeaders = !headers || !headers.length || !headers[0];
  let headersIndex = [];
  strDelimiter = strDelimiter || ",";

  const objPattern = new RegExp(
    `(${strDelimiter}|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\${strDelimiter}\\r\\n]*))`,
    "gi"
  );

  const gREGEX = /^'+(.*)$/gm;
  let arrData = [];
  let row =[];
  let arrMatches = null;
  let columnIndex = -1;
  let skipRow = false;
  let publishIdx = null;
  try {
    while ((arrMatches = objPattern.exec(strData.trim()))) {
      columnIndex++;

      const strMatchedDelimiter = arrMatches[1];

      //end of line/row
      if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
       if( !skipRow || !publishedOnly || arrData.length == 0 ) {
          arrData.push(row);   
        }
        row = [];
        columnIndex = 0;
        skipRow = false;
      }
    

      let strMatchedValue;

      if (arrMatches[2]) {
        strMatchedValue = arrMatches[2].replace(/""/g, '"');
      } else {
        strMatchedValue = arrMatches[3];
      }


      if ( strMatchedValue == "published" && !publishIdx) {
        publishIdx = columnIndex;
        console.log("strMatchedValue\'"+strMatchedValue+"\' == \"published\" && !publishIdx");
      }
    
      if (!skipRow && publishIdx == columnIndex && parseInt(strMatchedValue) != 1) {
        skipRow = true;
        // console.log("publishIdx \'"+publishIdx+"\"= columnIndex \'"+columnIndex+"\' && parseInt(strMatchedValue \'"+strMatchedValue+"\')"+parseInt(strMatchedValue));
      }



      let saveColumn = false;
      if (!skipHeaders) {
        if (headersIndex.includes(columnIndex)) {
          saveColumn = true;
        }
        if (headers.includes(strMatchedValue)) {
          headersIndex.push(columnIndex);
          saveColumn = true;
        }
      }

      if (skipHeaders || saveColumn) {
        if (Number.isInteger(strMatchedValue)) {
          row.push(parseInt(strMatchedValue));
        } else if (isNumber(strMatchedValue)) {
          row.push(parseFloat(strMatchedValue));
        } else {
          let value = strMatchedValue.replace(gREGEX, "''$1");
          row.push(value.trim());
        }
      }
    }
  } catch (e) {
    throw e;
  }
    console.timeEnd("CSVToArray(strData , strDelimiter = \""+strDelimiter+"\", headers = "+headers+")");
  return arrData;
}

/**
 * Checks if a value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a number, false otherwise.
 */
function isNumber(value) {
  return value !== undefined && value !== null && !isNaN(value);
}

/**
 * @param sheet Name of the tab to place the SDE data
 * @param csvFile Name of the file to download from Fuzworks
 * @param headers Optional Column Names to keep from the CSV Data while ignoring everything else. Defaults to Null (to grab everything)
 *
 * @class SdePage
 */
class SdePage {
  constructor(sheet, csvFile, headers = null, backupRanges = null, publishedOnly=true) {

    this.sheet = sheet;
    this.backupRanges = null;
    this.csvFile = csvFile;
    this.publishedOnly = false;
    if (headers != null) {
      this.headers = headers;
      if (!Array.isArray(headers)) this.headers = [headers];
    }

    if (backupRanges != null) {
      this.backupRanges = backupRanges;
      if (!Array.isArray(backupRanges)) this.backupRanges = [backupRanges];
    }
    if(!publishedOnly) {
      this.publishedOnly = publishedOnly;
    }
  }
}
