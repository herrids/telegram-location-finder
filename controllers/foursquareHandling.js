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
        } else {
          const fsAllVenues = JSON.parse(body).response.venues;
          if (fsAllVenues.length < search.index+1) resolve(null);
          if (fsAllVenues[search.index]) {
            const venueId = fsAllVenues[search.index].id
            request({
                url: "https://api.foursquare.com/v2/venues/" + venueId,
                method: "GET",
                qs: {
                    client_id: foursquare_config.client_id,
                    client_secret: foursquare_config.client_secret,
                    v: foursquare_config.v
                }
            }, async (err, res, body) => {
                const fsVenue = JSON.parse(body).response.venue
                const place = await Place.save(fsVenue)
                resolve(place)
            })
          }
        }
      }
    );
  });
};
