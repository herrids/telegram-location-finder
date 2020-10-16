const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    foursquareId: {
      type: String, 
      required: true
    },
    emoji: {type: String}
});

const Model = mongoose.model('Category', CategorySchema);

exports.findId = emoji => {
  return new Promise(resolve => Model.findOne({emoji})
  .then(category => {
    resolve(category ? category._id: null)
  }))
}

exports.find = emoji => {
  return new Promise(resolve => Model.findOne({emoji})
  .then(category => {
    resolve(category ? category: null)
  }))
}