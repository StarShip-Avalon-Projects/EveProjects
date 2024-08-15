/**
 * Version: 1.05
 * Author: CJ Kilman
 * Free to use and modify, Do not remove header.
 * 
 * This script imports SDE_invTypes data from Fuzworks CSV files into a Google Spreadsheet.
 * It includes functions for handling CSV data, managing spreadsheet sheets, and setting named ranges.
 */

/**
 * Main function to import SDE_invTypes from Fuzworks CSV files.
 */
function importSDE() {
  // Get the user interface for the current spreadsheet.
  const ui = SpreadsheetApp.getUi();

  // Display an alert to inform the user about the update process.
  const response = ui.alert('Updating the SDE',
    'Updating the SDE may take several minutes. Do not close the window, or you will have to restart. Continue?',
    ui.ButtonSet.YES_NO);

  // If the user agrees to continue, proceed with the import.
  if (response == ui.Button.YES) {
    // Prevent formulas from running while the import is in progress.
    const haltFormulas = [[0, 0]];

    const thisSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const loadingHelper = thisSpreadSheet.getRangeByName("'Utility'!B3:C3");
    const backupSettings = loadingHelper.getValues();
    loadingHelper.setValues(haltFormulas);

    try {
      // Define the SDE pages to import, specifying the sheet name, CSV file, and required columns which are OPTIONAL.
      const sdePages = [
        new SdePage("SDE_invTypes", "invTypes.csv", ["typeID", "typeName", "volume"]),
      ];
      // Build the SDE data for each defined page.
      sdePages.forEach(buildSDEs);
    } finally {
      // Restore the original formula settings.
      loadingHelper.setValues(backupSettings);
    }

  } else {
    // If the user cancels, display a message.
    ui.alert('SDE unchanged.');
  }
}

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
    let workSheet = activeSheet.getSheetByName(sdePage.sheet);

    // Create or clear the sheet for new data.
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
  if (rowsToRemove > 0) {
    workSheet.deleteRows(lastRow + 1, rowsToRemove);
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
        if (headers.includes(strMatchedValue)) {
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

/**
 * Checks if a value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a number, false otherwise.
 */
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
  this.csvFile = csvFile;
  this.headers = headers;
}
