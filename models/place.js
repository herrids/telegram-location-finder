const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = new Schema({
    foursquareId: {
      type: String, 
      required: true
    },
    name: {
      type: String, 
      required: true
    },
    longitude: {
      type: Number, 
      required: true
    },
    latitude: {
      type: Number, 
      required: true
    },
    price: {
      type: Number
    },
    rating: {
      score: { type: Number },
      weight: {type: Number }
    },
    hours: {
      days: { type: String},
      time: { type: String},
    },
    attributes: {
      type: Object,
    },
    fsObject: {
      type: Object,
    },



});

const Model = mongoose.model('Place', PlaceSchema);

exports.save = async fsVenue => {
  console.log(fsVenue)
  const place = await Model.findOne({foursquareId: fsVenue.id})
  if (place) return place
  else return await Model.create({
    foursquareId: fsVenue.id,
    name: fsVenue.name,
    longitude: fsVenue.location.lng,
    latitude: fsVenue.location.lat,
    price: fsVenue.price.tier,
    rating: {
      score: fsVenue.rating,
      weight: fsVenue.ratingSignals,
    },
    hours: {
      days: fsVenue.hours.timeframes.days,
      time: fsVenue.hours.timeframes.open.renderedTime
    },
    attributes: fsVenue.attributes,
    fsObject: fsVenue
  })
}