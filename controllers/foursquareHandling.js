const request = require("request")
const foursquare_config = require("../config/foursquareConfig")
const Place = require("../models/place")

exports.searchVenues = async (search) => {
  return new Promise(resolve => {
    request({
        url: "https://api.foursquare.com/v2/venues/search",
        method: "GET",
        qs: {
          client_id: foursquare_config.client_id,
          client_secret: foursquare_config.client_secret,
          ll: search.location.latitude + "," + search.location.longitude,
          radius: foursquare_config.radius,
          intent: foursquare_config.intent,
          categoryId: search.category.foursquareId,
          v: foursquare_config.v
        }
    }, async (err, res, body) => {
        if (err) {
          console.error(err);
          venue = false;
        } else {
          const fsJSON = JSON.parse(body);
          if (fsJSON.response.venues.length < search.index+1) resolve(null);
          if (fsJSON.response.venues[search.index]) {
            request({
                url: "https://api.foursquare.com/v2/venues/" + fsJSON.response.venues[search.index].id,
                method: "GET",
                qs: {
                    client_id: foursquare_config.client_id,
                    client_secret: foursquare_config.client_secret,
                    v: foursquare_config.v
                }
            }, (err, res, body) => {
                const parsedJSON = JSON.parse(body)
                console.log(parsedJSON.response.venue.price)
                console.log(parsedJSON.response.venue.attributes)
            })
            const place = await Place.save(fsJSON.response.venues[search.index])
            resolve([fsJSON.response.venues[search.index], place])
          }
        }
      }
    );
  });
};
