const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
