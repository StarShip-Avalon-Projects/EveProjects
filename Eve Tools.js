/**
 *Sum Column groups by header
 *
 * @param {*} input_array Multiple Array with Verticle Cells to Sum() and group by Column Header
 * @return {*} 2d array [type_id,sum]
 */
function verticle_sum_to_2d_list(input_array) {


    const arrFiltered = input_array.filter(function (x) { /* here, x is an array, not an object */
    return !(x.every(element => element === (undefined || null || '')))
  });
    let  headers = arrFiltered[0];
    headers = headers.filter(Number);
    var result = [];

    for (i = 0; i < headers.length; i++) {
        let val = [headers[i], 0];
        result.push(val);
    }

    for (var row = 1; row < arrFiltered.length; row++) {

        for (var cell = 0; cell < arrFiltered[row].length; cell++) {
            try{
            let val2 =  arrFiltered[row][cell];
            if (!isNaN(parseFloat(val2)) && isFinite(val2)) {
                result[cell][1] += val2;}
            } 
           
            catch{}

        }

    }
    return result;
}

function test()
{
      const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    var testRange = activeSheet.getRangeByName("IndyPickerData!AA5:CY").getValues();

    let ids =[ [
    16239,
16243,
24030,
32881,
  ],
  [1,1,1,1],
  [1,2,3,3],
  [,,,,],
  [],
  
    ];
  return verticle_sum_to_2d_list(testRange);
}