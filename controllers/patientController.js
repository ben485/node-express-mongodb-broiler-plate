/* eslint-disable prettier/prettier */
const factory = require('../services/factoryServices');
const specialFxn = require('../utils/specialFxn')
const patientModel = require('../models/patientModels')

const addPatientData = async(req, res, next) => {
    try {
        const patientPhamarcyID = await specialFxn.patientPhamarcyID(req.body.firstName, req.body.lastName);
        req.body.patientPhamarcyID = patientPhamarcyID;
        const response = await factory.saveToDb(patientModel, req.body);
        return res.status(200).json({
            message: 'success',
            response: response,
        });
    } catch (error) {
        return next(error);
    }
}

const fetchAllPharmacyPatient = async(req, res, next) => {
    try {
        const pharmacyID = (req.params.pharmacyID).trim();
        const patients = await factory.fetchItemsFromDB(patientModel, {pharmacyID:pharmacyID, status: true});
        const todayYear = new Date().getFullYear();
        const patientArray = []
        let counter = 0

        if(patients.length === 0){
            return res.status(200).json({
                message: 'success',
                items: [],
            });
        }

         patients.forEach(data => {
            // eslint-disable-next-line no-shadow
            const {dateOfBirth, firstName, lastName, telephone,  email, location, patientPhamarcyID, pharmacyID, emergencyContact, gender, maritalStatus, allergies, medicalCondition, socialHabits, status} = data;
            const birthYear = new Date(dateOfBirth).getFullYear();
            const age = todayYear - birthYear;
            const patientData = {firstName, lastName, telephone,  email, age, dateOfBirth, location, patientPhamarcyID, pharmacyID, emergencyContact, gender, maritalStatus, allergies, medicalCondition, socialHabits, status};
            patientArray.push(patientData);

            // eslint-disable-next-line no-plusplus
            counter++

            if(counter === patients.length){
                return res.status(200).json({
                    message: 'success',
                    items: patientArray,
                }); 
            }


         });
    } catch (error) {
         return next(error);
    }
}

const fetchOnePatientData = async(req, res,next) => {
    try {
         const patientPhamarcyID = (req.params.patientPhamarcyID).trim();
         const response = await factory.fetchOneItemFromDb(patientModel, {patientPhamarcyID});
         const todayYear = new Date().getFullYear();
         if(!response){
            return res.status(200).json({
                message: 'success',
                items: null,
            }); 
         }

         const {firstName, lastName, telephone,  email, dateOfBirth, location, pharmacyID, emergencyContact, gender, maritalStatus, allergies, medicalCondition, socialHabits, status} = response;
         const birthYear = new Date(dateOfBirth).getFullYear();
         const age = todayYear - birthYear;

         const patientData = {firstName, lastName, telephone,  email, age, dateOfBirth, location, patientPhamarcyID, pharmacyID, allergies, medicalCondition, socialHabits, emergencyContact, gender, maritalStatus, status};

         return res.status(200).json({
            message: 'success',
            items: patientData,
        }); 
    
    } catch (error) {
        return next(error);   
    }
}

const updatePatientInfo = async(req, res, next) => {
    try {
        const patientPhamarcyID = (req.params.patientPhamarcyID).trim()
        const {firstName, lastName, telephone,  email, location,  district, region} = req.body;

        const data = {firstName, lastName, telephone, email, location, district, region};

        const response = factory.updateOneItemInDb(patientModel, {patientPhamarcyID}, data);

        return res.status(200).json({
            message: 'success',
            data: response,
        }); 
    } catch (error) {
        return next(error);     
    }
}

const deactivatePatients = async(req, res, next) => {
    try {
        const patientPhamarcyID = (req.params.patientPhamarcyID).trim();
        const response = factory.updateOneItemInDb(patientModel, {patientPhamarcyID}, {status: false});
        
        return res.status(200).json({
            message: 'success',
            data: response,
        }); 
    } catch (error) {
        return next(error);     
    }
}

module.exports = {
    addPatientData,
    fetchAllPharmacyPatient,
    fetchOnePatientData,
    updatePatientInfo,
    deactivatePatients
}