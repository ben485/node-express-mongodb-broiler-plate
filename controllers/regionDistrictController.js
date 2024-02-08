/* eslint-disable prettier/prettier */

const RegionModel = require('../models/RegionModel');
const DistrictModel = require('../models/districtModel');

const factory = require('../services/factoryServices');

const saveRegion = async (req, res, next) => {
    try {
        const region = (req.body.region).trim();
        const regionCode = region.replace(/\s/g, '-')
        req.body.regionCode = regionCode
        const response = await factory.saveToDb(RegionModel, req.body);

        return res.status(200).json({
            message: 'success',
            data: response, 
          });
    } catch (error) {
        return next(error); 
    }
}

const saveDistrict = async (req, res, next) => {
    try {
        const district = (req.body.district).trim();
        const districtCode = district.replace(/\s/g, '-')
        req.body.districtCode = districtCode

       const response = await factory.saveToDb(DistrictModel, req.body) ;

       return res.status(200).json({
        message: 'success',
        data: response, 
      });
    } catch (error) {
     return next(error);   
    }
}


const fetchRegion = async (req, res, next) => {
    try {
        const response = await factory.fetchItemsFromDB(RegionModel, {});
        return res.status(200).json({
            message: 'success',
            data: response, 
          });
    } catch (error) {
        return next(error);   
    }
}

const fetchDistricts = async(req, res, next) => {
    try {
        const regionCode = (req.query.regionCode).trim();
        const response = await factory.fetchItemsFromDB(DistrictModel, {regionCode});
        return res.status(200).json({
            message: 'success',
            data: response, 
          });
    } catch (error) {
        return next(error);  
    }
}


module.exports = {
    saveRegion,
    saveDistrict, 
    fetchRegion,
    fetchDistricts
}

