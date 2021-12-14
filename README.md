# EveProjects
These scripts are for Google Sheets to interface with Fuzworks API

Free to use as you want as long as credit is given when due.

# GESI wrappers
This will enable existing google sheets with Eve Authorized characters to work.
They're not in tended for New Sheets or Adding new characters to the sheet as the Eve SSO is currently broke.

To get your sheet operational, Copy the code from GESI.wrappers.js to a js file in your Script editor.

Verivy that the GESI Library is installed as a Script Editor Library. Follow the GESI Documentation below:

### Script Editor (taken from Blacksmoke's Documentation)

By default, one does not have access to GESI functions for use in custom functions in the script editor.  In order to gain access to these functions for custom logic, add GESI as a library to your script:

1. Install the add-on, follow the [setup instructions](#setup).
1. Within the script editor, click the `+` icon next to the `Libraries` heading.
1. Paste in `1KjnRVVFr2KiHH55sqBfHcZ-yXweJ7iv89V99ubaLy4A7B_YH8rB5u0s3` into the `Script ID` box and click `Look up`.
1. Select the most recent version that is _NOT_ `HEAD`, and click `Add`.

In order to use this, functions must be perpended with `GESI`, which maps to the `Identifier` field in the Libraries modal.  For example, `GESI.universe_types();`

**NOTE:** Libraries _do not_ update on their own.  When a new version of GESI is released, click on `GESI` under the `Libraries` heading and select the most recent version that is _NOT_ `HEAD`.
