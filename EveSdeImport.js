/**
 * Verson: 1.04
  * Import SDE_invTypes from Fuzworks CSV files.
  *  Author: CJ Kilman
  *  Free to use and modify, Do not remove header.
  *
  * Change Log:
  * 6.16.1022 Fixed Ghost taling rows due to pesky trailing newlin and whitespaces in the Fuzworks feed
  * Added Named Range support for SDE Tables
  */

/**
* ref: https://blog.ouseful.info/2010/03/11/writing-2d-data-arrays-to-a-google-spreadsheet-from-google-apps-script-making-an-http-post-request-for-csv-data/
 */

/** Sample add menu option
 *  It is recodmended to copy this to a different script such as Main.js. Some place to keep your 
 * configeration stuff safe as this file is subject to modifcations.
function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('Sheet Tools')
        .addItem('Import SDE Data', 'importSDE')
        .addToUi();
  }
  */
/**
  * Import SDE_invTypes from Fuzworks CSV files.
  * ref: https://blog.ouseful.info/2010/03/11/writing-2d-data-arrays-to-a-google-spreadsheet-from-google-apps-script-making-an-http-post-request-for-csv-data/
*/

/**
 * SED Loader : Runs each SDE update
 * Sample Function
 * It is recodmended to copy this to a different script such as Main.js. Some place to keep your 
 * configeration stuff safe as this file is subject to modifcations.
 */
/**function importSDE()
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

      let rangeList =
      {
          sde_typeid_name : "SDE_invTypes" ,
          sde_groups : "SDE_invGroups",
          sde_volumes : "SDE_invVolumes",
          sde_reprocess_materials : "SDE_reprocessingMaterials"
      }
      setNamedRange(rangeList);
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
 * 
 * @param {*} sheetName Name of the Sheet (aka Tab)
 * @param {*} csvFile Name of SED to download from Fuzworks
 */
 function buildSDEs(sdePage) {
  if (sdePage == null)
    throw "sdePage is required";
  console.time("imortSDEinvTypes( sheetName:" + sdePage.sheet + ", csvFile:" + sdePage.csvFile + "  })");
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

    var destinationRange = workSheet.getRange(1, 1, csvData.length, numCols = csvData[0].length);
    destinationRange.setValues(csvData);

    //restore Backups
    if (sdePage.backupRanges != null)
      for (var i = 0; i < sdePage.backupRanges.length; i++) {
        var backupRange = workSheet.getRange(sdePage.backupRanges[i]);
        backupRange.setValues(backedupValues[i]);

      }

    deleteBlankColumnsAndCollumns(workSheet);
  }
  catch (e) {
    throw e;
  }

  console.timeEnd("imortSDEinvTypes( sheetName:" + sdePage.sheet + ", csvFile:" + sdePage.csvFile + " )")
}

function downloadTextData(csvFile) {
  console.time("downloadTextData( csvFile:" + csvFile + " })");

  const baseURL = 'https://www.fuzzwork.co.uk/dump/latest/' + csvFile;
  const csvContent = UrlFetchApp.fetch(baseURL).getContentText();

  console.timeEnd("downloadTextData( csvFile:" + csvFile + " })");
  return csvContent.trim().replace(/\n$/, "");
}


/**
 * Creates a blank sheet or resets Existing sheet
 * @param {*} sheetName  Expected String, Name of Sheet (tab name)
 * @returns Blank Sheet
 */
function createOrClearSdeSheet(sheetName) {
  console.time("createOrClearSdeSheet({sheetName:" + sheetName + "}})");
  if (sheetName === null || sheetName === "")
    throw "sheet name is required;";
  let activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  let workSheet = activeSheet.getSheetByName(sheetName);

  //found the Sheet, Clear it and Move on
  if (workSheet != null) {
    workSheet.clearContents();

    console.timeEnd("createOrClearSdeSheet({sheetName:" + sheetName + "}})");
    return workSheet;
  }
  //assume new sheet
  workSheet = activeSheet.insertSheet();
  workSheet.setName(sheetName);
  console.timeEnd("createOrClearSdeSheet({sheetName:" + sheetName + "}})");
  return workSheet;
}

function deleteBlankColumnsAndCollumns(workSheet) {
  if (workSheet == null)
    throw ("workSheet not defined")
  let maxColumns = workSheet.getMaxColumns();
  let lastColumns = workSheet.getLastColumn();
  let maxRows = workSheet.getMaxColumns();
  let lastRows = workSheet.getLastColumn();

  if (maxRows - lastRows == 0 && maxColumns - lastColumns == 0) return;

  const columnsReset = 2;
  const rowsReset = 2;

  if (lastColumns < columnsReset) { //save 2 columns on a new sheet
    lastColumns = columnsReset;
  }
  if (maxColumns - lastColumns != 0) {
    workSheet.deleteColumns(lastColumns + 1, maxColumns - lastColumns);
  }
  if (lastRows < rowsReset) { //save 2 columns on a new sheet
    lastRows = rowsReset;
  }
  if (maxRows - lastRows != 0) {
    workSheet.deleteRows(lastRows + 1, maxRows - lastRows);
  }

}




// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter = ",", headers = null) {

  const skipHeaders = (headers == null || headers.length == 0 || headers[0] == null);
  let headersIndex = [];
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    (
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

      // google leading apostrophe
      // ('+)

      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"

    ),
    "gi"
  );

  const gREGEX = /^'+(.*)$/gm;
  // Fix Google String?

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;
  var columnIndex = -1;

try{
  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec(strData.trim())) {
    columnIndex++;

    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];


    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (
      strMatchedDelimiter.length &&
      strMatchedDelimiter !== strDelimiter
    ) {

      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
      columnIndex = 0;

    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {

      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(
        new RegExp("\"\"", "g"),
        "\""
      );

    }
    else {

      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];

    }
    // Skip row at column here?


    let saveColumn = false;
    if (!skipHeaders) {
      //allow only headers to pass
      if (headersIndex.indexOf(columnIndex) > -1) {
        saveColumn = true;
      }
      //row 0 assume is headers
      if (headers.indexOf(strMatchedValue) > -1) {
        headersIndex.push(columnIndex);
        saveColumn = true;
      }
    }

    if (skipHeaders || saveColumn) {

        if (Number.isInteger(strMatchedValue))
          arrData[arrData.length - 1].push(parseInt(strMatchedValue));
        else  if (isNumber(strMatchedValue))
        arrData[arrData.length - 1].push(parseFloat(strMatchedValue));
        else
        {
          if(strMatchedValue !=null){
          let value = strMatchedValue.replace(gREGEX, "''$1");
          arrData[arrData.length - 1].push(value.trim());
          }
          else
           arrData[arrData.length - 1].push( strMatchedValue);
        }
    }

  }
}
catch (e){
throw e;

}
  // Return the parsed data.
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
  if ((undefined === value) || (null === value)) {
    return false;
  }
  if (typeof value == 'number') {
    return true;
  }
  return !isNaN(value - 0);
}

function testNamedRangeCreate()
{
    // Lock Formulas from running
  const haltFormulas = [[0,0]];
  
    var thisSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var loadingHelper= thisSpreadSheet.getRangeByName("'Utility'!B3:C3");
  const  backupSettings = loadingHelper.getValues();
  loadingHelper.setValues(haltFormulas);
  try {
    let rangeList =
    {
      sde_group_category : "SDE_invGroups",
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



/**
 *Sets a Named Range
 * "sde_typeid_name", A:A,LastCol:LastRow
 *
 * @param {*} name
 * @param {*} options
 */
 function setNamedRange(rangeList)
{
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let sheets = ss.getSheets();
      const errors = [];
    //  SpreadsheetApp.flush();
      Object.entries(rangeList).forEach(entry  => 
        {
          try{
             //   SpreadsheetApp.flush();
          const [key, value] = entry;
         const sheet = ss.getSheetByName(value);
         // FIXME: Exceptions cause by Range Locked in another Process.
        const rangeToSet = sheet.getRange(1,1,sheet.getLastRow(),sheet.getLastColumn());
         ss.setNamedRange( key,rangeToSet);    
          } 
          catch(e)
          {
            const [key, value] = entry;
          errors.push( new Error("Named Range Error: " & key));
           errors.push(e);
          }    
        })
/*           if (errors.length > 0) {
          throw new Error(errors.join()); 
        }*/
        sheets.forEach(sheet => {
          const namedRanges = sheet.getNamedRanges();
          namedRanges.forEach(nRange => {
            console.log(`Name: ${nRange.getName()} range: ${nRange.getRange().getA1Notation()}`);
          });
        });
}


/**
 * @param sheet Name of the tab to place the SDE data
 * @param csvFile Name of the file to download from Fuzworks
 * @param headers Optional Column Names to keep from the CSV Data while ignoring everything else. Defaults to Null (to grab everything)
 *
 * @class SdePage
 */
class SdePage {
  constructor(sheet, csvFile, headers = null, backupRanges = null) {

    this.sheet = sheet;
    this.backupRanges = null;
    this.csvFile = csvFile;

    if (headers != null) {
      this.headers = headers;
      if (!Array.isArray(headers)) this.headers = [headers];
    }

    if (backupRanges != null) {
      this.backupRanges = backupRanges;
      if (!Array.isArray(backupRanges)) this.backupRanges = [backupRanges];
    }

  }
}

class SDEError extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
    this.message = message + " has not yet been implemented.";
  }
}