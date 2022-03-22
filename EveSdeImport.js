
/** Sample add menu option
function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('Sheet Tools')
        .addItem('Import SDE Data', 'importSDE')
        .addToUi();
  }
  */
// SDE_invTypes :: https://www.fuzzwork.co.uk/dump/latest/invTypes.csv

/**
 * SED Loader : Runs each SDE update
 */
async function importSDE()
{
    // Display an alert box with a title, message, input field, and "Yes" and "No" buttons. The
    // user can also close the dialog by clicking the close button in its title bar.
    var ui = SpreadsheetApp.getUi();

    var response = ui.alert('Updating the SDE', 
        'Updating the SDE may take several minutes. In the meantime do not close the window otherwise you will have to restart. Continue?',
        ui.ButtonSet.YES_NO);

    // Process the user's response.
    if (response == ui.Button.YES) {

      //await  imortSDEinvTypes("SDE_industryActivityProducts","industryActivityProducts.csv");

        await  imortSDEinvTypes("SDE_invUniqueNames.","invUniqueNames.csv");
        await  imortSDEinvTypes("SDE_invTypes","invTypes.csv");

    } else if (response == ui.Button.NO) {
        ui.alert('SDE unchanged.');
    } else {
        ui.alert('SDE unchanged.');
    }
 
 }


 /**
   * Import SDE_invTypes from Fuzworks CSV files.
   * ref: https://blog.ouseful.info/2010/03/11/writing-2d-data-arrays-to-a-google-spreadsheet-from-google-apps-script-making-an-http-post-request-for-csv-data/
*/

/**
 * 
 * @param {*} sheetName Name of the Sheet (aka Tab)
 * @param {*} csvFile Name of SED to download from Fuzworks
 */
async function imortSDEinvTypes(sheetName,csvFile)
{
     console.time("imortSDEinvTypes( sheetName:"+sheetName+", csvFile:"+csvFile+"  })");
    if(sheetName == null)
        throw "sheetName is required";
    if(csvFile == null)
        throw "csvFile is required";

    let sdeSheet = createOrClearSdeSheet(sheetName);

    let csvContent = null;
    csvContent = downloadTextData(csvFile);

    const csvData = CSVToArray(csvContent);

    let rows = [];
    let cells = [];
    for (var i=0;i < csvData.length-1;i++) 
    {
        cells=[];
        for (var j=0; j< csvData[0].length;j++){
            cells.push(csvData[i][j]);
        }
        rows.push(cells);
    }
    let  destinationRange = sdeSheet.getRange(1, 1, i, j);
    destinationRange.setValues(rows);
   console.timeEnd("imortSDEinvTypes( sheetName:"+sheetName+", csvFile:"+csvFile+"  })");
  return sheetName;
}

function downloadTextData(csvFile)
{
   console.time("downloadTextData( csvFile:"+csvFile+" })");
    let csvContent = null;
    const  baseURL  = 'https://www.fuzzwork.co.uk/dump/latest/' + csvFile;
    
    try {
        csvContent = UrlFetchApp.fetch(baseURL).getContentText();
    
    } catch (error) {
        throw error;
    }
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
        var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    var workSheet = activeSheet.getSheetByName(sheetName);

    //found the Sheet, Clear it and Move on
    if (workSheet != null) {
          workSheet.clear();
          console.timeEnd("createOrClearSdeSheet({sheetName:"+sheetName+"}})");
          return workSheet;
    }
    //assume new sheet
    workSheet = activeSheet.insertSheet();
    workSheet.setName(sheetName);
   
    console.timeEnd("createOrClearSdeSheet({sheetName:"+sheetName+"}})");

    return workSheet;
}

function testSheet()
{
  imortSDEinvTypes("SDE_invUniqueNames.","invUniqueNames.csv");
}

 // ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    console.time("CSVToArray( strData, strDelimiter })");
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    const googleCellLimit = 10000000;

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


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

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

            arrData[ arrData.length - 1 ].push( strMatchedValue.replace(gREGEX,"''$1") );

        }

        // Return the parsed data.
         console.timeEnd("CSVToArray( strData, strDelimiter })");
        return( arrData );
    }

