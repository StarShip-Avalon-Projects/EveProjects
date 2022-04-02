
//JITA SELL

/**
* Generic API function to get a list of minimal prices for an array of type_id's
* @param {range} A vertical range of type_ids.
* @param {market_hub_id} market region ID, Defaults to Jita:60003760
* @param {order_type} sell or buy
* @param {order_level} min,max,average,mean
* @return minSell for each type_id. This can be configured differently.
* @customfunction
* Author: unknown
* Modified by CJ Kilman 11/19/2021 Added Configuration options and a Safe request buffer to avoide overloading the service get requesgt method
*/
function fuzzApiPrice(type_ids, market_hub_id = 60003760, order_type = "sell",order_level = "min") {
    if (!type_ids) throw 'type_ids is required';
    if (!Array.isArray(type_ids)) type_ids = [type_ids]; 

    // filter Blank type_ids
    type_ids = type_ids.filter(e =>{ return e === 0 || e });
    
    //Default to Jita if not specified.
    if( isNaN(market_hub_id))   market_hub_id = 60003760;

      /*
      * Configuration Section
      */
    const service_url = "https://market.fuzzwork.co.uk/aggregates/?station=" + market_hub_id +"&types=";
    const safe_item_limit = 200; // Some Endpoint services are limited to 200 integers
  
    let fuzz_price_data = "";
      // Check for Safe id count
    if(type_ids.length < safe_item_limit)
    {
      fuzz_price_data =  JSON.parse(UrlFetchApp.fetch(service_url + type_ids.join(",")));
      return type_ids.map(type_id =>{ return [parseFloat(fuzz_price_data[type_id][order_type.toLowerCase()][order_level.toLowerCase()])]; });
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
          result = result.concat( safe_id_set.map(type_id =>  [parseFloat(fuzz_price_data[type_id][order_type.toLowerCase()][order_level.toLowerCase()])]));
  
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
    result = result.concat( safe_id_set.map(type_id => [parseFloat(fuzz_price_data[type_id][order_type.toLowerCase()][order_level.toLowerCase()])]));
    }
    
    return result;
  }


/**
* Fuzz market API for the given types
*
* @param {range} range A vertical range of type_ids.
* @param {string} string Jita, Amarr, Dodixie, Rens, Hek, Defaults to Jita.
* @param {string} string sell or buy. Defaults to sell.
* @param {string} string min, max, or avg. Defaults to min.
* @return result for each type_id. This can be configured differently.
* @customfunction
* Author: unknown
* Modified by CJ Kilman 11/19/2021 Added configuration options and a Safe request buffer to avoid overloading the service get request method
* Modified by Snowdevil / Highfly Chastot 12/16/2021 Added functionality for choosing hub, type, and level. Little refactoring, could use more.
*/
function fuzzPriceDataByHub(type_ids, market_hub = "jita", order_type = "sell", order_level = "min") {
    // Safety net
    if (!type_ids) throw 'type_ids is required';
    if (!Array.isArray(type_ids)) type_ids = [type_ids]; 
    type_ids = type_ids.filter(Number) ;

     let marketHubID = 60003760; // You'll find no place filled with scum and villianry like Jita;
    switch (market_hub.toLowerCase()) {

    case 'amarr':
        marketHubID = 60008494;
        break;
    case 'dodixie':
        marketHubID = 60011866;
        break;
    case 'rens':
        marketHubID = 60004588;
        break;
    case 'hek':
        marketHubID = 60005686;
        break;
    }

    return fuzzApiPrice(type_ids , marketHubID , order_type , order_level)

  }
