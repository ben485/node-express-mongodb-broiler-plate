/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const patientModel = new mongoose.Schema({
  firstName: {
    type: String,
     required: ['first Name is required', true]
  },

  lastName: {
     type: String,
     required: ['Last Name is required', true]
  },

  dateOfBirth: {
    type: String,
    required: ['DOB is required', true]
  },

  telephone: {
    type: String,
    required: ['Telephone is required', true]
  },

  gender: {
    type: String,
    required: ['Gender is required', true]
  },

  emergencyContact: {
    type: String,
    default: ''
  },

  maritalStatus: {
    type: String,
    default: 'N/A'
  },

  email: {
    type: String,
    default: 'N/A'
  },

  location: {
    type: String,
    default: 'N/A'
  },

  allergies: [{alergy:String, trigger: String}],

  medicalCondition: [{disease: String}],

  socialHabits: [{habit: String}],


  patientPhamarcyID: {
    type: String,
    required: ['The patient pharmacy Id i srequired', true]
  },

  pharmacyID: {
    type: String,
    required: ['The  pharmacyID i srequired', true]
  },

  status: {
    type: Boolean,
    default: true
  }


});

const patients = mongoose.model('patients', patientModel);
module.exports = patients;