
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
function fuzzApiPriceDataJitaSell(type_ids, market_hub = 60003760, order_type = null ,order_level=null)
{
    if (!type_ids) throw 'type_ids is required';
    if(!Array.isArray(type_ids)) type_ids = [type_ids];
    type_ids = type_ids.filter(Number) ;

    if(order_type == null &&  order_level == null){
      order_type = "sell";
      order_level = "min";
    }

    if(order_type == null &&  order_level.toLowerCase() == "max") order_type = "buy";
    if(order_type == null &&  order_level.toLowerCase() == "min") order_type= "sell";
    if(order_type.toLowerCase() == "buy" &&  order_level == null) order_level = "max";
    if(order_type.toLowerCase() == "sell" &&  order_level == null) order_level = "min";
    order_type = order_type.toLowerCase(); order_level = order_level.toLowerCase();

      let price_data;
      var result=[];
  

  // Capture overflow buffer

      price_data = postFetch(type_ids,market_hub,"station")
      for(var i=0 ; i < type_ids.length ; i++)
      {
        try
        {
            result = result.concat(parseFloat(price_data[type_ids[i]][order_type][order_level]));
        }
        catch(error) // Value not on market, Leave Blank cell
        {
          result = result.concat("");
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
function fuzzPriceDataByHub(type_ids, market_hub = "Jita", order_type = "sell", order_level = null) 
{
    // Safety net
    if (!type_ids) throw 'type_ids is required';
    // Select hub ID, can ONLY use major trade hubs with this API
try{
  market_hub  = market_hub.toLowerCase();
}catch{}
    switch (market_hub) {
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
    market_hub = 60003760;
  break;
    default:
     
     
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

  /**
* MarketStat API for the given types
*
* @param {range} range A vertical range of type_ids.
* @param {string} string location type
* @param {string} string location Id
* @param {string} string sell or buy. Defaults to sell.
* @param {string} string min, max, or avg. Defaults to min.
* @return result for each type_id. This can be configured differently.
* @customfunction
*/
function marketStatData(type_ids, location_type, location_id, order_type = null, order_level = null) {

  if (!type_ids) throw 'type_ids is required';
  if(!Array.isArray(type_ids)) type_ids = [type_ids];
  type_ids = type_ids.filter(Number) ;


  if(order_type == null &&  order_level == null){
    order_type = "sell";
    order_level = "min";
  }

  if(order_type == null &&  order_level.toLowerCase() == "max") order_type = "buy";
  if(order_type == null &&  order_level.toLowerCase() == "min") order_type= "sell";
  if(order_type.toLowerCase() == "buy" &&  order_level == null) order_level = "max";
  if(order_type.toLowerCase() == "sell" &&  order_level == null) order_level = "min";
  order_type = order_type.toLowerCase(); order_level = order_level.toLowerCase();

  // Configuration Section
  switch(location_type.toLowerCase()){
    case "region":
    case "system":
    case "station":
      location_type = location_type.toLowerCase();
      break;
    default:
     throw new Error("Location Undefined");
  }

  let price_data;
  var result=[];


// Capture overflow buffer

  price_data = postFetch(type_ids,location_id,location_type)
  for(var i=0 ; i < type_ids.length ; i++)
  {
    try
    {
        result = result.concat(parseFloat(price_data[type_ids[i]][order_type][order_level]));
    }
    catch(error) // Value not on market, Leave Blank cell
    {
      result = result.concat("");
    }
  }


return result;
}

/**
 *Pull Prce data from Fuzworks using Post request method
 *
 * @param {*} type_ids
 * @param {*} location_id
 * @param {string} [location_type="station"] station, region, or system
 * @return {price_data} array 
 */
function postFetch(type_ids,location_id,location_type="station")
  {
    if (!type_ids) throw 'type_ids is required';
    if(!Array.isArray(type_ids)) type_ids = [type_ids];
    type_ids = type_ids.filter(Number) ;
     /*
      * Configuration Section
      */
    if(location_type !='region' && location_type !='station' && location_type !='system')
        throw new Error("Invalid location_type, must be either 'region' or 'station' or 'system'")
 
    const service_url = "https://market.fuzzwork.co.uk/aggregates/";
    let data ={};
    switch(location_type)
    {
      case "system":
      {
          data = {
            "system" : location_id,
            "types" : type_ids.join(",")
          };
          break;
      }
      case "region":
      {
          data = {
            "region" : location_id,
            "types" : type_ids.join(",")
          };
          break;
      }
      case  "station" :
      {
          data = {
            "station" : location_id,
            "types" : type_ids.join(",")
          };
          break;
      }
      default:
        throw new Error("Invalid location_type.")
    }

    const payload = JSON.stringify(data);
    const options = {
      "method" : "POST",
      "contentType" : "application/json",
      "payload" : payload
    };

    var response = UrlFetchApp.fetch(service_url, options);
    if(response.getResponseCode() != 200)
      throw new Error("Fuzworks broke with error code:" + response.getResponseCode())
    return JSON.parse(response.getContentText());

  }
  
