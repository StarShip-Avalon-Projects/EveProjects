//JITA SELL

/**
* Query's Fuzz market API for the given types
* @param {range} A vertical range of type_ids.
* @param {market_hub_id} market region ID, Defaults to Jita:60003760
* @return minSell for each type_id. This can be configured differently.
* @customfunction
* Author unknown
* Modified by CJ Kilman 11/19/2021 Added Configuration options and a Safe request buffer to avoide overloading the service get requesgt method
*/
function fuzzApiPriceDataJitaSell(type_ids, market_hub_id) {
  if (!type_ids) throw 'type_ids is required';
    
  // Default to Jita
    if (!market_hub_id) 
    var market_hub_id = 60003760;

    /*
    * Configuration Section
    */
  const service_url = "https://market.fuzzwork.co.uk/aggregates/?station=" + market_hub_id +"&types=";
  const safe_item_limit = 200; // Some Endpoint services are limited to 200 integers
  const order_type = "sell"; //options sell or buy
  const order_level = "min";// option min,max,average

    var fuzz_price_data = "";
    // Check for Safe id count
  if(type_ids.length < safe_item_limit)
  {
    fuzz_price_data =  JSON.parse(UrlFetchApp.fetch(service_url + type_ids.join(",")));
    return type_ids.map(function(type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; });
  }
  

  var result=[];

  // safe request buffer stuff
  var safe_id_set= [];
  var safe_item_index = 0; 
  
  for (i = 0; i < type_ids.length - 1  ;i++)
    {
        // Copy itemss into a Safe Array
      safe_id_set.push(type_ids[i]);

     //Once Full, Grab the data result
      if (safe_item_index > safe_item_limit)
      {
        fuzz_price_data = JSON.parse(UrlFetchApp.fetch(service_url + safe_id_set.join(",")));
        result = result.concat( safe_id_set.map(function(type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; }))

        //Reset the request buffer for the next set
        safe_item_index = 0;
        safe_id_set = [];
      }
      safe_item_index++;
    }
  
// Capture overflow buffer
  if(safe_id_set.length > 0)
  {
  fuzz_price_data = JSON.parse(UrlFetchApp.fetch(service_url + safe_id_set.join(",")));
  result = result.concat( safe_id_set.map(function(type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; }))
  }
  
  return result;
}
