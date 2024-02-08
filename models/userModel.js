/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: ['Please input your firstname', true],
  },

  lastName: {
    type: String,
    required: ['Please input your last name', true],
  },

  email: {
    type: String,
    required: ['Please input email', true],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide correct email'],
  },

  phoneNumber: {
    type: String,
    required: ['Please input phone number', true],
    unique: ['Telephone number already registered', true],
  },

  pharmacy: {
    type: String,
    required: ['Please input your pharmacy name is required', true],
  },

  branch: {
    type: Number,
    default: 1
  },

  region: {
    type: String,
    required: ['Please input your pharmacy name is required', true],
  },

  district: {
    type: String,
    required: ['Please input your district name is required', true],
  },

  city: {
    type: String,
    required: ['Please input your city name is required', true],
  },

  userID: {
    type: String,
    require: true,
    immutable: true,
  },

  pharmacyID: {
    type: String,
    require: true,
    immutable: true,
  },

  active: {
    type: Boolean,
    select: false,
    default: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },

  verifyUser: {
    type: Boolean,
    default: false,
  },


  password: {
    type: String,
    required: [true, 'Password is required'],
    immutable: true,
    select: false,
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('pharmacies', userSchema);

module.exports = User;
