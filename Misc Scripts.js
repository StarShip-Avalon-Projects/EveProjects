function verticle_sum_to_2d_list(input_array) {


  const arrFiltered = input_array.filter(function (x) { /* here, x is an array, not an object */
    return !(x.every(element => element === (undefined || null || '')))
  });
  let headers = arrFiltered[0];
  headers = headers.filter(Number);
  var result = [];

  for (i = 0; i < headers.length; i++) {
    let val = [headers[i], 0];
    result.push(val);
  }

  for (var row = 1; row < arrFiltered.length; row++) {

    for (var cell = 0; cell < arrFiltered[row].length; cell++) {
      try {
        let val2 = arrFiltered[row][cell];
        if (!isNaN(parseFloat(val2)) && isFinite(val2)) {
          result[cell][1] += val2;
        }
      }

      catch { }

    }

  }
  return result;
}

function test() {
  const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  var testRange = activeSheet.getRangeByName("IndyPickerData!AA5:CY").getValues();

  let ids = [[
    16239,
    16243,
    24030,
    32881,
  ],
  [1, 1, 1, 1],
  [1, 2, 3, 3],
  [, , , ,],
  [],

  ];
  return verticle_sum_to_2d_list(testRange);
}

function testMarketAuth() {
  let ids = [
    205,
    2173,
    22542,
    501,
    22576,
    2293,
    31718,
    31360,
    31754,
    17482,
    523,
    26929,
    189,
    201,
    1820,
    1830,
    191,
    245,
    241,
    247,
    261,
    254,
    262,
    2444,
    260,
    32033,
    32041,
    32049,
    32057,
    2537,
    , , , ,
  ];


  /**var sheet=SpreadsheetApp.getActiveSpreadsheet();
  var range = sheet.getRangeByName("Sheet1!B2:B34");
  var ids= range.getValues();*/
  const auth_toon = "Jason Kilman";
  const ashab_tranquility_id = 1023968078820;
  const amarrMarketID = 60008494;
  var result = marketStatDtataAuth(ids, auth_toon, "Station", ashab_tranquility_id, "Sell", "Min");
  //var result2 =  marketStatData(ids, "Station", ashab_tranquility_id, "Sell", "Min");
  return null;
}


/**
 * Get Prices from Structure & Station as well as System and Region.
 * Check Structures with Authentication first then falback to Fuzworks API
 */
function marketStatDtataAuth(type_ids, auth_character, location_type, location_id, order_type = null, order_level = null) {

  if (!type_ids) throw 'type_ids is required';

  if (!Array.isArray(type_ids)) type_ids = [type_ids];
  type_ids = type_ids.filter(Number);
  if (order_type == null && order_level == null) {
    order_type = "sell";
    order_level = "min";
  }

  if (order_type == null && order_level.toLowerCase() == "max") order_type = "buy";
  if (order_type == null && order_level.toLowerCase() == "min") order_type = "sell";
  if (order_type.toLowerCase() == "buy" && order_level == null) order_level = "max";
  if (order_type.toLowerCase() == "sell" && order_level == null) order_level = "min";
  order_type = order_type.toLowerCase(); order_level = order_level.toLowerCase();

  var result = [];

  var price_data = [];

try{
  if (location_type.toLowerCase() == "station") {
    price_data = raw_markets_structures_structure(location_id, auth_character,false);
    const is_buy_order = order_type.toLowerCase() == "buy";

    price_data = price_data.filter(item => item.is_buy_order == is_buy_order);
    price_data = price_data.filter(item => !type_ids.includes(item.type_id));

    if (order_level == "min") {


      let values = price_data.map(function (v) {
        return v.price;
      });
      var min = Math.min.apply(null, values);
      console.log(min);

    }
    else {
      let values = price_data.map(function (v) {
        return v.price;
      });
      var max = Math.max.apply(null, values);
         console.log(max);
    }

    for (var i = 0; i < type_ids.length; i++) {
        var found = false;
        let item;
        for(var j = 0; j < price_data.length; j++){

          item = price_data[j];
           // result.push(parseInt([parseInt.type_id),,]));
          if (item.type_id == parseInt(type_ids[i])) {
                result.push(item.price);
                found = true;
                break;
          }
      } 
      if(found == false)
        result.push("");
        
    }
 
  }
}catch(e){
  return marketStatData(type_ids, location_type, location_id, order_type, order_level)
}
     return result;
}

function raw_markets_structures_structure(structure_id, name, show_column_headings = true, version = "v1") {
  if (!structure_id) throw new Error(`structure_id is required`);
  return GESI.invokeRaw('markets_structures_structure', { structure_id, name, show_column_headings, version })
}

function marketStatData(type_ids, location_type, location_id, order_type = null, order_level = null) {

  if (!type_ids) throw 'type_ids is required';
  if (!Array.isArray(type_ids)) type_ids = [type_ids];
  type_ids = type_ids.filter(Number);

  if (order_type == null && order_level == null) {
    order_type = "sell";
    order_level = "min";
  }

  if (order_type == null && order_level.toLowerCase() == "max") order_type = "buy";
  if (order_type == null && order_level.toLowerCase() == "min") order_type = "sell";
  if (order_type.toLowerCase() == "buy" && order_level == null) order_level = "max";
  if (order_type.toLowerCase() == "sell" && order_level == null) order_level = "min";
  order_type = order_type.toLowerCase(); order_level = order_level.toLowerCase();

  // Configuration Section
  switch (location_type.toLowerCase()) {
    case "region":
    case "system":
    case "station":
      location_type = location_type.toLowerCase();
      break;
    default:
      throw new Error("Location Undefined");
  }

  let price_data;
  var result = [];


  // Capture overflow buffer

  price_data = postFetch(type_ids, location_id, location_type)
  for (var i = 0; i < type_ids.length; i++) {
    let value = "";
    try {
      value = parseFloat(price_data[type_ids[i]][order_type][order_level]);
    }
    catch (error) // Value not on market, Leave Blank cell
    {

    }
    result = result.concat(value);
  }


  return result;
}


/**
 * Enhances Google Sheets' native "query" method.  Allows you to specify column-names instead of using the column letters in the SQL statement (no spaces allowed in identifiers)
 * 
 * Sample : =query(data!A1:I,SQL("data!A1:I1","SELECT Owner-Name,Owner-Email,Type,Account-Name",false),true)
 *  
 * Params : useColNums (boolean) : false/default = generate "SELECT A, B, C" syntax 
 *                                 true = generate "SELECT Col1, Col2, Col3" syntax
 * reference: https://productforums.google.com/forum/#!topic/docs/vTgy3hgj4M4
 * by: Matthew Quinlan
 */
function sqlFromHeaderNames(rangeName, queryString, useColNums) {

  let ss = SpreadsheetApp.getActiveSpreadsheet();

  let range;
  try {
    range = ss.getRange(rangeName);
  }
  catch (e) {
    range = ss.getRangeByName(rangeName);
  }

  let headers = range.getValues()[0];

  for (var i = 0; i < headers.length; i++) {
    if (headers[i].length < 1) continue;
    var re = new RegExp("\\b" + headers[i] + "\\b", "gm");
    if (useColNums) {
      var columnName = "Col" + Math.floor(i + 1);
      queryString = queryString.replace(re, columnName);
    }
    else {
      var columnLetter = range.getCell(1, i + 1).getA1Notation().split(/[0-9]/)[0];
      queryString = queryString.replace(re, columnLetter);
    }
  }
  //Logger.log(queryString);
  return queryString;
}
