const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    enum: ['user', 'host'],
    default : 'user',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
