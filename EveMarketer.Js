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
function marketStatData(type_ids, location_type, location_id, order_type = "sell", order_level = "min") {
  // Safety net 
  if (!type_ids) throw 'type_ids is required';
  if (!location_id) throw 'location id is required';
  if (!Array.isArray(type_ids)) type_ids = [type_ids]; 
  // Configuration Section
  let location = "";
  switch(location_type.toLowerCase()){
  case "region":
      location = "regionlimit=" + location_id;
      break;
   case "system":
      location = "usesystem=" + location_id;
      break;
    default:
     throw"Location Undefined";
  }

  const service_url = "https://api.evemarketer.com/ec/marketstat/json?&" + location +"&typeid=";
  const safe_item_limit = 150; // The limit for MarketStat is 200 for each fetch

   let result = [];

  if(type_ids.length < safe_item_limit)
  {
    const marketstat_price_data =  JSON.parse(UrlFetchApp.fetch(service_url + type_ids.join(",")));
    for(currentIndex=0 ; currentIndex < type_ids.length ; currentIndex++)
    {
        try
        {
            result = result.concat( marketstat_price_data[currentIndex][order_type][order_level]);
        }
        catch(error) // Value not on market, Leave Blank cell
        {
            result = result.concat("");
        }
    }
    return result;
  } 
  // Safe request buffer stuff

  let safe_id_set= [];
  let safe_item_index = 0; 
  // Start running loop for safe array
  for (i = 0; i < type_ids.length; i++)
  {
      safe_id_set.push(type_ids[i]); // Copy items into a Safe Array
          if (safe_item_index > safe_item_limit) // Once Full, Grab the data result
          {
            const marketstat_price_data =  JSON.parse(UrlFetchApp.fetch(service_url + safe_id_set.join(",")));
              for(currentIndex=0 ; currentIndex < type_ids.length ; currentIndex++)
              {
                try
                {
                    result = result.concat( marketstat_price_data[currentIndex][order_type][order_level]);
                }
                catch(error) // Value not on market, Leave Blank cell
                {
                    result = result.concat("");
                }
              }
              // Reset the request buffer for the next set
              safe_item_index = 0;
              safe_id_set = [];
          }
      safe_item_index++;
  }
  // Capture overflow buffer
  if(safe_id_set.length > 0)
  {
    const marketstat_price_data =  JSON.parse(UrlFetchApp.fetch(service_url + safe_id_set.join(",")));
    for(currentIndex=0 ; currentIndex < type_ids.length ; currentIndex++)
    {
        try
        {
            result = result.concat( marketstat_price_data[currentIndex][order_type][order_level]);
        }
        catch(error) // Value not on market, Leave Blank cell
        {
           result = result.concat("");
        }
    }
  }
  return result;
}
