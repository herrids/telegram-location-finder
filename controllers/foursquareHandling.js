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
            console.log(JSON.parse(body).response.venues)
          const allVenuesFoursquareResponse = JSON.parse(body);
          if (allVenuesFoursquareResponse.response.venues.length < search.index+1) resolve(null);
          if (allVenuesFoursquareResponse.response.venues[search.index]) {
            const venueId = allVenuesFoursquareResponse.response.venues[search.index].id
            request({
                url: "https://api.foursquare.com/v2/venues/" + venueId,
                method: "GET",
                qs: {
                    client_id: foursquare_config.client_id,
                    client_secret: foursquare_config.client_secret,
                    v: foursquare_config.v
                }
            }, (err, res, body) => {
                const parsedJSON = JSON.parse(body)
                console.log(parsedJSON.response.venue.price)
                parsedJSON.response.venue.attributes.groups.forEach(attr => console.log(attr.items))
            })
            const place = await Place.save(allVenuesFoursquareResponse.response.venues[search.index])
            resolve([allVenuesFoursquareResponse.response.venues[search.index], place])
          }
        }
      }
    );
  });
};
