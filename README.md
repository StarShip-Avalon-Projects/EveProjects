# EveProjects

These scripts are for Google Sheets to interface with Fuzworks API

Free to use as you want as long as credit is given when due.

# Eve SDE Importer

[Fuzworks](https://www.fuzzwork.co.uk/2021/07/17/understanding-the-eve-online-sde-1/) has a system that converts the Eve SDE package into useable formats.
This script downloads CSV formats and updates SDE Tables used in Google Sheets making this script a good companion with GESI.

To use Copy EveSdeImport.js to the Google Sheet Script editor (or Clasp for local editing).
Then its just a matter of setting up the configuration.

```js
/** Sample add menu option */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu("Sheet Tools")
    .addItem("Update SDE Data", "importSDE")
    .addToUi();
}
function importSDE() {
  // Display an alert box with a title, message, input field, and "Yes" and "No" buttons. The
  // user can also close the dialog by clicking the close button in its title bar.
  var ui = SpreadsheetApp.getUi();

  var response = ui.alert(
    "Updating the SDE",
    "Updating the SDE may take several minutes. In the meantime do not close the window otherwise you will have to restart. Continue?",
    ui.ButtonSet.YES_NO
  );

  // Process the user's response.
  if (response == ui.Button.YES) {
    SpreadsheetApp.flush();
    const sdePages = [
      /**   new SdePage(
          "SDE_sample",
          "sample.csv",
          [ "sample headers", "These are not required",]
          ),
          */
      new SdePage(
        "SDE_invTypes",
        "invTypes.csv",
        /** Optional headers,
         * invTypes is 100+ megabytes. Select Columns needed to help it laod faster.
         */
        ["typeID", "groupID", "typeName", "mass", "volume"],
        false // turns off published filtering DEFAULT: publishedOnly = true
      ),
        new SdePage(
        "SDE_industryActivityMaterials",
        "industryActivityMaterials.csv",
          [],
          "'SDE_industryActivityMaterials'!E1:E2"), // ex: E2 =IF(Utility!C3 <>1,,ARRAYFORMULA(IFNA(IF(IFS(B2:B=1,TRUE,B2:B=11,true)=false,0,SUMIF('ESI Adjusted Price'!C:C,C2:C,'ESI Adjusted Price'!A:A)*D2:D),0)))
    ];
    sdePages.forEach((page) => buildSDEs(page));
  } else if (response == ui.Button.NO) {
    ui.alert("SDE unchanged.");
  } else {
    ui.alert("SDE unchanged.");
  }
}
```

# GESI wrappers (depreciated)

This will enable existing google sheets with Eve Authorized characters to work.
They're not in tended for New Sheets or Adding new characters to the sheet GESI installer isn't working properly.

To get your sheet operational, Copy the code from GESI.wrappers.js to a .js file in your Script editor.

Verify that the GESI Library is installed as a Script Editor Library. Follow the GESI Documentation below:

### Script Editor (taken from Blacksmoke's Documentation)

By default, one does not have access to GESI functions for use in custom functions in the script editor. In order to gain access to these functions for custom logic, add GESI as a library to your script:

1. Install the add-on, follow the [setup instructions](#setup).
1. Within the script editor, click the `+` icon next to the `Libraries` heading.
1. Paste in `1KjnRVVFr2KiHH55sqBfHcZ-yXweJ7iv89V99ubaLy4A7B_YH8rB5u0s3` into the `Script ID` box and click `Look up`.
1. Select the most recent version that is _NOT_ `HEAD`, and click `Add`.

In order to use this, functions must be perpended with `GESI`, which maps to the `Identifier` field in the Libraries modal. For example, `GESI.universe_types();`

**NOTE:** Libraries _do not_ update on their own. When a new version of GESI is released, click on `GESI` under the `Libraries` heading and select the most recent version that is _NOT_ `HEAD`.
