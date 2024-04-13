import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    description: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'host', 'admin', 'superadmin'],
      default : 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;