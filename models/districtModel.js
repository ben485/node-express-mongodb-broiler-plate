/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const activityModel = new mongoose.Schema({
  district: {
    type: String,
     required: ['Please select package type', true]
  },

  regionCode: {
    type: String,
    required: ['Please select region code type', true]
  },

  districtCode: {
    type: String,
    required: ['Please select districtcode type', true]
  }

});

const districts = mongoose.model('districts', activityModel);
module.exports = districts;