const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    messengerId: {
      type: String, 
      required: true
    },
    firstname: {type: String},
    lastname: {type: String}
});

const Model = mongoose.model('User', UserSchema);

exports.findOneOrCreate = async (messengerId, firstname, lastname) => {
  const user = await Model.findOne({messengerId})
  return user ? user : await Model.create({messengerId, firstname, lastname})
}