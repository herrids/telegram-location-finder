const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    content: {
      type: mongoose.Schema.Types.Mixed, 
      required: true
    },
    date: mongoose.Schema.Types.Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
});

const Model = mongoose.model('Message', MessageSchema);

exports.save = (content, user) => {
  return Model.create({content, user, date: Date.now()},
   (err, obj) => err ? console.log(err) : obj)
}