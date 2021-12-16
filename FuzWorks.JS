/**
* Fuzz market API for the given types
*
* @param {range} range A vertical range of type_ids.
* @param {string} string Jita, Amarr, Dodixie, Rens, Hek, Defaults to Jita.
* @param {string} string sell or buy. Defaults to sell.
* @param {string} string min, max, or avg. Defaults to min.
* @return result for each type_id. This can be configured differently.
* @customfunction
* Author unknown
* Modified by CJ Kilman 11/19/2021 Added configuration options and a Safe request buffer to avoid overloading the service get request method
* Modified by Snowdevil / Highfly Chastot 12/16/2021 Added functionality for choosing hub, type, and level. Little refactoring, could use more.
*/
function fuzzPriceData(type_ids, market_hub, order_type, order_level) {
    // Safety net
    if (!type_ids) throw 'type_ids is required';
    if (!order_type) var order_type = "sell";
    if (!order_level) var order_level = "min";
    // Select hub ID, can ONLY use major trade hubs with this API
    switch (market_hub) {
    case 'Jita':
        market_hub = 60003760;
        break;
    case 'Amarr':
        market_hub = 60008494;
        break;
    case 'Dodixie':
        market_hub = 60011866;
        break;
    case 'Rens':
        market_hub = 60004588;
        break;
    case 'Hek':
        market_hub = 60005686;
        break;
    default:
        market_hub = 60003760;
    }
    // Configuration Section
    const service_url = "https://market.fuzzwork.co.uk/aggregates/?station=" + market_hub +"&types=";
    const safe_item_limit = 200; // Some Endpoint services are limited to 200 integers
    let fuzz_price_data = ""; // Sets blank let
    // Check for Safe id count
    if(type_ids.length < safe_item_limit)
    {
      fuzz_price_data =  JSON.parse(UrlFetchApp.fetch(service_url + type_ids.join(",")));
      return type_ids.map(function(type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; });
    } 
    // Safe request buffer stuff
    let result=[];
    let safe_id_set= [];
    let safe_item_index = 0; 
    // Start running loop for safe array
    for (i = 0; i < type_ids.length; i++)
    {
        safe_id_set.push(type_ids[i]); // Copy items into a Safe Array
            if (safe_item_index > safe_item_limit) // Once Full, Grab the data result
            {
                fuzz_price_data = JSON.parse(UrlFetchApp.fetch(service_url + safe_id_set.join(",")));
                result = result.concat( safe_id_set.map(function(type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; }));
                // Reset the request buffer for the next set
                safe_item_index = 0;
                safe_id_set = [];
            }
        safe_item_index++;
    }
    // Capture overflow buffer
    if(safe_id_set.length > 0)
    {
        fuzz_price_data = JSON.parse(UrlFetchApp.fetch(service_url + safe_id_set.join(",")));
        result = result.concat( safe_id_set.map(function(type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; }));
    }
    return result;
  }
  
