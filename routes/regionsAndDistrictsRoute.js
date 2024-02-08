/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();

const districtRegionController = require('../controllers/regionDistrictController');

router.post('/regions', districtRegionController.saveRegion);

router.post('/districts', districtRegionController.saveDistrict);

router.get('/regions', districtRegionController.fetchRegion);

router.get('/districts', districtRegionController.fetchDistricts)

module.exports = router