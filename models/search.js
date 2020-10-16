const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user")

const SearchSchema = new Schema({
    location: {
      longitude: {type: mongoose.Schema.Types.Number},
      latitude: {type: mongoose.Schema.Types.Number}
    },
    rating: {type: mongoose.Schema.Types.String},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    place: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Place"
    },
    dateStarted: {type: mongoose.Schema.Types.Date}

});


const Model = mongoose.model('Search', SearchSchema);

exports.updateOrCreate = (user, search) => {
  return new Promise(async resolve => {
    const result = await Model.findOneAndUpdate({
      user, dateStarted: search.added
    }, {
      location: search.location,
      rating: search.rating,
      user: user._id,
      category: search.category ? search.category._id : null,
      place: search.place ? search.place._id: null
    })
    return result ? result : await Model.create({
      location: search.location,
      rating: search.rating,
      user: user._id,
      category: search.category ? search.category._id : null,
      place: search.place ? search.place._id: null,
      dateStarted: search.added
    })
  })
}

exports.findLatest = async () => {
  return new Promise(resolve => 
    Model.find().sort({dateStarted: "desc"}).populate("user").then(res => 
      resolve(res ? res : null)))
}