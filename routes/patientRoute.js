/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();

const patientController = require('../controllers/patientController')

router.post('/personal-data', patientController.addPatientData);

router.get('/personal-data/:pharmacyID', patientController.fetchAllPharmacyPatient);

router.get('/personal-data/details/:patientPhamarcyID', patientController.fetchOnePatientData)

router.patch('/personal-data/:patientPhamarcyID', patientController.updatePatientInfo);

router.patch('/personal/deactivate/:patientPhamarcyID', patientController.deactivatePatients)


module.exports = router