/**
 * Version: 1.05
 * Author: CJ Kilman
 * Free to use and modify, Do not remove header.
  *
 * This script imports SDE_invTypes data from Fuzworks CSV files into a Google Spreadsheet.
 * It includes functions for handling CSV data, managing spreadsheet sheets, and setting named ranges.
  */

/**
 * Sample function to import SDE_invTypes from Fuzworks CSV files.
 * Copy this function to a file like "main.js. This helps upgrades by replacing this file."
 */
/*
/**
function importSDE() {
  // Get the user interface for the current spreadsheet.
  const ui = SpreadsheetApp.getUi();

  // Display an alert to inform the user about the update process.
  const response = ui.alert('Updating the SDE',
    'Updating the SDE may take several minutes. Do not close the window, or you will have to restart. Continue?',
        ui.ButtonSet.YES_NO);

  // If the user agrees to continue, proceed with the import.
    if (response == ui.Button.YES) {

      // Lock Formulas from running 
      // sample foromula with lock "=If(Utility!B3 <> 1,, IF(setting_iscorp = False, "", corporations_corporation_assets(setting_director)) )"
      const haltFormulas = [[0,0]];

    const thisSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const loadingHelper = thisSpreadSheet.getRangeByName("'Utility'!B3:C3");
    const backupSettings = loadingHelper.getValues();
      loadingHelper.setValues(haltFormulas); 

    try {
      // Define the SDE pages to import, specifying the sheet name, CSV file, and required columns which are OPTIONAL.
    const sdePages = [
    /**   new SdePage(
          "SDE_sample",
          "sample.csv",
          [ "sample headers", "These are not required",]
          ),*
        new SdePage(
        "SDE_invTypes", //sheet tab title
        "invTypes.csv", // fuzworks file name
          /** Optional headers,  
           * invTypes is 100+ megabytes. Select Collumns needed to help it laod faster. 

          [ "typeID","groupID","typeName","mass","volume"]
          ),
      ];
      sdePages.forEach(buildSDEs);
    } finally {
      // Restore the original formula settings.
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
  const csvData = CSVToArray(csvContent, ",", sdePage.headers);


  try {

    const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    var workSheet = activeSheet.getSheetByName(sdePage.sheet);

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

    workSheet = createOrClearSdeSheet(sdePage.sheet);

    // Write the CSV data to the sheet.
    const destinationRange = workSheet.getRange(1, 1, csvData.length, csvData[0].length);
    destinationRange.setValues(csvData);

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
  if (lastRows < rowsReset) { //save 2 columns on a new sheet
    lastRows = rowsReset;
  }
  if (maxRows - lastRows != 0) {
    workSheet.deleteRows(lastRows + 1, maxRows - lastRows);
  }
}

/**
 * Parses a CSV string into a 2D array.
 * @param {string} strData - The CSV string to parse.
 * @param {string} strDelimiter - The delimiter used in the CSV string.
 * @param {Array} headers - Array of headers to filter columns.
 * @returns {Array} - The parsed 2D array.
 */
function CSVToArray(strData, strDelimiter = ",", headers = null) {
  const skipHeaders = !headers || !headers.length || !headers[0];
  let headersIndex = [];
  strDelimiter = strDelimiter || ",";

  const objPattern = new RegExp(
    `(${strDelimiter}|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\${strDelimiter}\\r\\n]*))`,
    "gi"
  );

  const gREGEX = /^'+(.*)$/gm;
  let arrData = [[]];
  let arrMatches = null;
  let columnIndex = -1;

  try {
    while ((arrMatches = objPattern.exec(strData.trim()))) {
    columnIndex++;

      const strMatchedDelimiter = arrMatches[1];

      if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      arrData.push([]);
      columnIndex = 0;

    }

      let strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
        strMatchedValue = arrMatches[2].replace(/""/g, '"');
      } else {
      strMatchedValue = arrMatches[3];
    }

    let saveColumn = false;
    if (!skipHeaders) {
        if (headersIndex.includes(columnIndex)) {
        saveColumn = true;
      }
      //row 0 assume is headers
      if (headers.indexOf(strMatchedValue) > -1) {
        headersIndex.push(columnIndex);
        saveColumn = true;
      }
    }

    if (skipHeaders || saveColumn) {
        if (Number.isInteger(strMatchedValue)) {
          arrData[arrData.length - 1].push(parseInt(strMatchedValue));
        } else if (isNumber(strMatchedValue)) {
        arrData[arrData.length - 1].push(parseFloat(strMatchedValue));
        } else {
          let value = strMatchedValue.replace(gREGEX, "''$1");
          arrData[arrData.length - 1].push(value.trim());
          }
        }
    }
  } catch (e) {
    throw e;
  }

  return arrData;
}
function testSDE() {

  // Lock Formulas from running
  const haltFormulas = [[0,0]];

  var thisSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var loadingHelper= thisSpreadSheet.getRangeByName("'Utility'!B3:C3");
  const  backupSettings = loadingHelper.getValues();
  loadingHelper.setValues(haltFormulas);
  try {

            const sdePages = [
                new SdePage(
                "SDE_invTypes",
                "invTypes.csv",
                  // Optional headers,  
                  // invTypes is 100+ megabytes. Select columns needed to help it load faster. 
                  [ "typeID","groupID","typeName","volume"]
                  ),
                new SdePage(
                "SDE_industryActivityProducts",
                "industryActivityProducts.csv",
                  []
                  ),
                new SdePage(
                "SDE_industryActivityMaterials",
                "industryActivityMaterials.csv",
                  []
                  ),
                new SdePage(
                "SDE_invVolumes",
                "invVolumes.csv",
                  []
                  ),
                new SdePage(
                "SDE_invGroups",
                "invGroups.csv",
                  ["groupID", "categoryID", "groupName"]
                  )
              ];
               sdePages.forEach(buildSDEs);
          let rangeList =
          {
            sde_group_category :"SDE_invGroups",
                  sde_activity_products : "SDE_industryActivityProducts",
        sde_typeid_name : "SDE_invTypes" ,
        sde_packaged_volume : "SDE_invVolumes"

    }
    setNamedRange(rangeList);

      }
  finally {
    // release lock
    loadingHelper.setValues(backupSettings);
  }
}

function isNumber(value) {
  return value !== undefined && value !== null && !isNaN(value);
}

/**
 * Constructor function for SdePage objects.
 * @param {string} sheet - The name of the sheet to create or update.
 * @param {string} csvFile - The name of the CSV file to download.
 * @param {Array} headers - The headers to filter the CSV data. OPTIONAL
 */
function SdePage(sheet, csvFile, headers) {
    this.sheet = sheet;
    this.backupRanges = null;
    this.csvFile = csvFile;

    if (headers != null) {
      this.headers = headers;
}
}
