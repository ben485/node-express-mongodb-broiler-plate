/* eslint-disable prettier/prettier */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable prefer-arrow-callback */

/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

const userService = require('../services/authServices');
const factory = require('../services/factoryServices');

const specialFxn = require('../utils/specialFxn');
const otpHandler = require('../utils/otpHandlers')

const resetPasswordLink = require('../utils/EmailTemplate/resetPasswordLink');



const register = (req, res, next) => {
    const password = (req.body.password).trim()
    userService.checkEmail(req.body.email, (err, result) => {
        if(err){
          return next(err);
        }
        userService.checkTelephone(req.body.telephone, (err, result) => {
            if(err){
                return next(err);   
            }
            specialFxn.generateUserID(req.body.firstName, req.body.lastName).then((userID) => {
              bcrypt.hash(password, 10, function(err, hash){
                if(err){
                  return next(err)
                }
                req.body.userID = userID;
               req.body.password = hash; 
               specialFxn.generateRandomChar(12).then((pharmacyID) => {
                 req.body.pharmacyID = pharmacyID
   
                 userService.Register(req.body, (err, result) => {
                   if(err){
                       return next(err);   
                   }
                   
                   const name = `${req.body.firstName} ${req.body.lastName}`
   
                   otpHandler.createOtp(req.body.email, req.body.phoneNumber, name, (err, result) => {
                       if(err){
                           return next(err); 
                       }
                       return res.status(200).json({message: 'success', description:'new user registered successfully',userID:userID, email:req.body.email, phoneNumber: req.body.phoneNumber, name: `${req.body.firstName} ${req.body.lastName}`})
                   })
   
                 })  
               })     
              })
           })
        })
    })
}


const verifyUserMailOrPhone = (req, res, next) => {
    const data = req.body
    userService.verifyUserEmailOrPhone(data, (err, results) => {
      if(err){
       return next(err)
      }
      return res.status(200).json({ message: 'success', description:'user verified successfully' })
    })
 }
 
 
 // This function is an function for handling user login requests.
 const login = (req, res, next) => {
   userService.Login(req.body, (err, results) => {
     // This line calls the `Login` function from the `userServices` module, passing `req.body` (request body) as an argument.
     if (err) {
       // This block checks if there is an error (`err`) returned from the `Login` function.
       return next(err);
     }else{
      return res.status(200).json({ message: 'success', data: results });
     }
     // If there are no errors, this block sends a JSON response to the client with a status of 200 (OK).
 
   });
 };
 
  
  const forgetPasswordPage = (req, res, next) => {
    try {
      const email = req.body.email.trim();
  
      // Find user by email, handle "Email not registered" error
      userService.checkEmailForForgetpassword(email, (err, Data) => {
        if (err) {
          return next(err);
          // eslint-disable-next-line no-else-return
        } 

        const {user, data} = Data

        if(user === false){
          res.status(200)
          .json({ message: 'failed', description: 'The email provided is not registered',  data: data });
          }

          resetPasswordLink.sendResetPasswordLink({name: `${data.firstName} ${data.lastName}`, email: email, link: `https://med-box.vercel.app/en/create-new-password?${data.id}`});

          res.status(200)
          .json({ message: 'success', description: 'An email has been sent to your email',  data: data });
        });
    } catch (error) {
      return next(error);
    }
  };


  // Handle password reset request
const passwordReset = (req, res, next) => {
    try {
      // Destructure variables from request body
      const { newPassword, confirmPassword, id } = req.body;
      
  
      // Validate new password length
      if (newPassword.length < 8) {
        return res.status(403).json({message: 'The new password should be at least 8 characters long.'})
        }
    
          // Validate password match
        if(newPassword !== confirmPassword){
        return res.status(401).json({message: 'Password do not match.'})
        }
    
        // Hash the new password
        // eslint-disable-next-line prefer-arrow-callback
        bcrypt.hash(newPassword, 10, function(err, hash) {
            if(err){
              return next(err)
            }
    
             // Reset the user's password
            // eslint-disable-next-line no-shadow
            userService.resetPassword(hash, id, (err, results) => {
              if(err){
                return next(err)
              }
  
    
              return res.status(200).json({ message: 'Password reset successfully.'});
        });
      });
    } catch (error) {
      // Pass any errors to the next middleware for handling
      return next(error);
    }
  }



  const changePassword = (req, res, next) => {
    const {oldPassword, newPassword, confirmPassword, email} = req.body;
  
    if(newPassword !== confirmPassword) {
      return res.status(401).json({message: 'Password do not match'})
    }
  
    userService.checkIfPasswordExist(email, oldPassword, (err, result) => {
      if(err){
        return next(err)
      }else{
           if(result === true){
            bcrypt.hash(newPassword, 10, function(err, hash) {
              if(err){
                return res.status(403).json({message: 'error Occurred in encrypting the data'})
              }
              userService.resetPassword(hash, email, (err, result) => {
                if(err){
                  return next(err)
                }
  
               return res.status(200).json({ message: 'Password changed successfully.'});
              })
            })
              
           }else{
            return res.status(403).json({message: 'Password do not match'})
           }
  
      }
    })
  }
  
  
  const resendOtpCode = (req, res, next) => {
    try {
      otpHandler.createOtp(req.body.email, req.body.phoneNumber, req.body.name, (err, items)=>{
         if(err){
          return next(err)
         }else{
          return res.status(200).json({
            message: 'success',
            data: items,
          });
         }
      })
    } catch (error) {
      return next(error)
    }
  }

 const profilePage = async(req, res, next) => {
    try {
        const userID = req.user.data.userID.trim();
        const response = await factory.fetchOneItemFromDb(UserModel, {userID});
        return res.status(200).json({
            message: 'success',
            data: response,
          });
    } catch (error) {
        return next(error) 
    }
 }

 const updateUserData = async(req, res, next) => {
    try {
        const userID = req.user.data.userID.trim();
        const response = await factory.updateOneItemInDb(UserModel, {userID}, req.body);
        return res.status(200).json({
            message: 'success',
            data: response,
          });
    } catch (error) {
        return next(error)  
    }
 }

module.exports = {
  register,
  verifyUserMailOrPhone,
  login,
  forgetPasswordPage,
  passwordReset,
  changePassword,
  resendOtpCode,
  profilePage,
  updateUserData
}