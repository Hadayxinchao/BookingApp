const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);

module.exports = User;
