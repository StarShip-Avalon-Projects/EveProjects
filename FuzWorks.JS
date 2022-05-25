
//JITA SELL

function testfuzAPI()
{
  let ids = [
    16239,
16243,
24030,
32881,
17366,
16273,
34206,
34202,
34203,
34205,
34204,
34201,
19761,
42695,
42830
  ];
  return fuzzApiPriceDataJitaSell(ids);
}

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
function fuzzApiPriceDataJitaSell(type_ids, market_hub_id = 60003760, order_type = null ,order_level=null) {
    if (!type_ids) throw 'type_ids is required';
    if(!Array.isArray(type_ids)) type_ids = [type_ids];
    type_ids = type_ids.filter(Number) ;

    if( isNaN(market_hub_id))    market_hub_id = 60003760;

    if(order_type == null &&  order_level == null){
      order_type = "sell";
      order_level = "min";
    }

    if(order_type == null &&  order_level.toLowerCase() == "max") order_type = "buy";
    if(order_type == null &&  order_level.toLowerCase() == "min") order_type= "sell";
    if(order_type.toLowerCase() == "buy" &&  order_level == null) order_level = "max";
    if(order_type.toLowerCase() == "sell" &&  order_level == null) order_level = "min";
    order_type = order_type.toLowerCase(); order_level = order_level.toLowerCase();

      /*
      * Configuration Section
      */
    const service_url = "https://market.fuzzwork.co.uk/aggregates/?station=" + market_hub_id +"&types=";
    const safe_item_limit = 200; // Some Endpoint services are limited to 200 integers
  
      let price_data;
      var result=[];

    let safe_id_set= [];
    let safe_item_index = 0; 

    if(type_ids.length < safe_item_limit)
    {
      price_data =  JSON.parse(UrlFetchApp.fetch(service_url + type_ids.join(",")));
      for(var currentIndex=0 ; currentIndex < type_ids.length ; currentIndex++)
      {
        try
        {
            result = result.concat(parseFloat(price_data[type_ids[currentIndex]][order_type][order_level]));
        }
        catch(error) // Value not on market, Leave Blank cell
        {
            result = result.concat("");
        }
      }

      return result;
    }
  

  

    
    for (i = 0; i < type_ids.length - 1  ;i++)
      {
          // Copy itemss into a Safe Array
        safe_id_set.push(type_ids[i]);
  
       //Once Full, Grab the data result
        if (safe_item_index > safe_item_limit)
        {
          price_data = JSON.parse(UrlFetchApp.fetch(service_url + safe_id_set.join(",")));
          for(currentIndex=0 ; currentIndex < safe_id_set.length ; currentIndex++)
          {
            try
            {
            result = result.concat(parseFloat(price_data[safe_id_set[currentIndex]][order_type][order_level]));
            }
            catch(error) // Value not on market, Leave Blank cell
            {
                result = result.concat("");
            }
          }
          //Reset the request buffer for the next set
          safe_item_index = 0;
          safe_id_set = [];
        }
        safe_item_index++;
      }

  // Capture overflow buffer
    if(safe_id_set.length > 0)
    {
      price_data = JSON.parse(UrlFetchApp.fetch(service_url + safe_id_set.join(",")));
      for(currentIndex=0 ; currentIndex < safe_id_set.length ; currentIndex++)
      {
        try
        {
            result = result.concat(parseFloat(price_data[safe_id_set[currentIndex]][order_type][order_level]));
        }
        catch(error) // Value not on market, Leave Blank cell
        {
          result = result.concat("");
        }
      }
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
function fuzzPriceDataByHub(type_ids, market_hub = "Jita", order_type = "sell", order_level = null) {
    // Safety net
    if (!type_ids) throw 'type_ids is required';
    // Select hub ID, can ONLY use major trade hubs with this API
    switch (market_hub.toLowerCase()) {
    case 'amarr':
        market_hub = 60008494;
        break;
    case 'dodixie':
        market_hub = 60011866;
        break;
    case 'rens':
        market_hub = 60004588;
        break;
    case 'hek':
        market_hub = 60005686;
        break; 
    case 'jita':
    default:
        market_hub = 60003760;
    }
    
    //deal with defaults on most used order types

      if(order_level==null)
      {
        switch(order_type.toLowerCase()){
    
        case 'buy':
              order_level = "max";
              break;
        case 'sell':
        default:
          order_level= "min";
            }
          }
    // result
    return fuzzApiPriceDataJitaSell(type_ids,market_hub,order_type,order_level);
  

  }
  
