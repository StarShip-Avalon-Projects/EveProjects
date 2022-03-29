
/** Sample add menu option
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
 * It is recodmended
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
    SpreadsheetApp.flush()
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
function buildSDEs(sdePage)
{
  if(sdePage == null)
  throw "sdePage is required";
     console.time("imortSDEinvTypes( sheetName:"+sdePage.sheet+", csvFile:"+sdePage.csvFile+"  })");
    const csvContent = downloadTextData(sdePage.csvFile);
    const csvData = CSVToArray(csvContent, "," ,sdePage.headers);

    let rows = [];
    let cells = [];
    for (var i=0;i < csvData.length ;i++) 
    {
       
        for (var j=0; j< csvData[0].length;j++){
            cells.push(csvData[i][j]);
        }
        
        rows.push(cells);
        cells=[];
    }
    var workSheet = createOrClearSdeSheet(sdePage.sheet);
    var  destinationRange = workSheet.getRange(1, 1, i, j);
    destinationRange.setValues(rows);
    deleteBlankColumns(workSheet);
    deleteBlankRows(workSheet);

   console.timeEnd("imortSDEinvTypes( sheetName:"+sdePage.sheet+", csvFile:"+sdePage.csvFile+" )")
}

function downloadTextData(csvFile)
{
   console.time("downloadTextData( csvFile:"+csvFile+" })");
   
   const  baseURL  = 'https://www.fuzzwork.co.uk/dump/latest/' + csvFile;
   const  csvContent = UrlFetchApp.fetch(baseURL).getContentText();
   
   console.timeEnd("downloadTextData( csvFile:"+csvFile+" })");
    return csvContent;
}


/**
 * Creates a blank sheet or resets Existing sheet
 * @param {*} sheetName  Expected String, Name of Sheet (tab name)
 * @returns Blank Sheet
 */
 function  createOrClearSdeSheet(sheetName)
{
    console.time("createOrClearSdeSheet({sheetName:"+sheetName+"}})");
    if(sheetName === null || sheetName === "")
        throw "sheet name is required;";
    let activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    let workSheet = activeSheet.getSheetByName(sheetName);

    //found the Sheet, Clear it and Move on
    if (workSheet != null) {
        workSheet.clearContents();
        
        console.timeEnd("createOrClearSdeSheet({sheetName:"+sheetName+"}})");
        return workSheet;
    }
    //assume new sheet
    workSheet = activeSheet.insertSheet();
    workSheet.setName(sheetName);
    deleteBlankColumns(workSheet);
    deleteBlankRows(workSheet);
    console.timeEnd("createOrClearSdeSheet({sheetName:"+sheetName+"}})");
    return workSheet;
}



function deleteBlankColumns(workSheet) {
  let maxColumns = workSheet.getMaxColumns();
  let lastColumn = workSheet.getLastColumn();
  if (maxColumns - lastColumn != 0) {
    if(lastColumn < 2){ //save 2 columns on a new sheet
      lastColumn = 2;
    }
    workSheet.deleteColumns(lastColumn + 1, maxColumns - lastColumn);
  }
}

function deleteBlankRows(workSheet) {
  var maxRows = workSheet.getMaxRows(); 
  var lastRow = workSheet.getLastRow();
  if (maxRows-lastRow != 0){
    if(lastRow < 2){ //save 2 columns on a new sheet
      lastRow = 2;
    }
    workSheet.deleteRows(lastRow+1, maxRows-lastRow);
  }
}



 // ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter=",",headers = null ){

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

    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        columnIndex ++;
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
      
      
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
            columnIndex = 0;

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ])
        {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

            }
        else
          {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }
          // Skip row at column here?
               
        let saveCollumn =false;
        //allow only headers to pass
        if(headersIndex.indexOf(columnIndex) > -1 ){
          saveCollumn =true;
        }
        //row 0 assume is headers
        if(headers.indexOf(strMatchedValue) > -1)
        {
          headersIndex.push( columnIndex);
          saveCollumn =true;
        }


        if(skipHeaders || saveCollumn){
            arrData[ arrData.length - 1 ].push( strMatchedValue.replace(gREGEX,"''$1") );
          }
      
        }


            // Return the parsed data.
        return( arrData );
    }

/**
 *
 *
 * @class SdePage
 */
class SdePage {
  constructor(sheet, csvFile, headers = null) {

    this.sheet = sheet;

    this.csvFile = csvFile;

    if (!Array.isArray(headers))
      this.headers = [headers];
    else
      this.headers = headers;

  }
}
