/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const User = require('../models/userModel');
const patientModel = require('../models/patientModels');
const factory = require('../services/factoryServices');

function generateRandomNumber(){
    const min = 10000000;
    const max = 99999999;
   return Math.floor(Math.random() * (max - min + 1) + min);
 }

 function generateFacilityID(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }


async function patientPhamarcyID(firstName, lastName){
    try {
        const randomNumber = generateRandomNumber();

        const count = await factory.countDocument(patientModel, {})

        const firstLetter = firstName.charAt(0)
        const lastLetter = lastName.charAt(0)
     
        const userID = firstLetter.toUpperCase()+''+lastLetter.toUpperCase()+'-'+count+''+randomNumber
        
        return userID
        
         
    } catch (error) {
       return error
    }
}


async function generateUserID(firstName, lastName){
  try {
    const randomNumber = generateRandomNumber();

        const count = await factory.countDocument(patientModel, {})

        const firstLetter = firstName.charAt(0)
        const lastLetter = lastName.charAt(0)
     
        const userID = firstLetter.toUpperCase()+''+lastLetter.toUpperCase()+'-'+count+''+randomNumber
        
        return userID
      
       
  } catch (error) {
     return error
  }
}


async function generateRandomChar(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const randomNumber = generateRandomNumber()
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    const pharmacyID = result+''+randomNumber
    return pharmacyID;
  }

async function generateProviderID(firstName, lastName){
    try {

        const randomNumber = generateRandomNumber()
        const firstLetter = firstName.charAt(0)
        const lastLetter = lastName.charAt(0)
        const userID = 'P'+firstLetter.toUpperCase()+''+lastLetter.toUpperCase()+'-'+randomNumber
        return userID
    } catch (error) {
       return error
    }
}


async function generateFaciltyID(firstName, lastName){
    try {

        const randomNumber = generateRandomNumber()
        const firstLetter = firstName.charAt(0)
        const lastLetter = lastName.charAt(0)
        const userID = 'F'+firstLetter.toUpperCase()+''+lastLetter.toUpperCase()+'-'+randomNumber
        const facilityID = generateFacilityID(12)
        const data = {userID, facilityID}

        return data   
    } catch (error) {
       return error
    }
}


async function generateLabOrderID(orderType){
  try {
    const randomNumber = generateRandomNumber();
    const initialsChar = orderType.substring(0, 3);
    const initials = initialsChar.toUpperCase()
    const labOrderId = initials+'-'+randomNumber;
    return labOrderId
  } catch (error) {
    return error
  }

}



 module.exports = {
    patientPhamarcyID,
    generateRandomChar,
    generateProviderID, 
    generateFaciltyID,
    generateLabOrderID,
    generateUserID
 }