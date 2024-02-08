/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const activityModel = new mongoose.Schema({
  region: {
    type: String,
     required: ['Please select package type', true]
  },

  regionCode: {
     type: String,
  },

});

const regions = mongoose.model('regions', activityModel);
module.exports = regions;