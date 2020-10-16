const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = new Schema({
    foursquareId: {
      type: String, 
      required: true
    },
});

const Model = mongoose.model('Place', PlaceSchema);

exports.save = async fsPlace => {
  const place = await Model.findOne({foursquareId: fsPlace.id})
  return place ? place : await Model.create({foursquareId: fsPlace.id})
}