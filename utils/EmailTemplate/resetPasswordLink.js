/* eslint-disable prettier/prettier */
const ejs = require("ejs");

//const {emailTransporter} = require('../utils/nodeMailerConfig')
// eslint-disable-next-line no-unused-vars
const sendEmailSendgrid = require('../sendGridconfiq')
const {sendEmailNodeMailer} = require('../nodeMailerConfig')

 
 const sendResetPasswordLink = async(Data) => {
    try {
       const email = (Data.email).trim()
        // eslint-disable-next-line no-path-concat, prefer-template
        const data = await ejs.renderFile(__dirname + "/viewTemplate/reset-password.ejs", {Data});

        const mainOptions = {
           from: 'Medbox <benjamin.andoh@abibiman.org>',
           to: email,
           subject: 'Reset password link',
           html: data
          };

          sendEmailNodeMailer.sendMail(mainOptions, (err, info) => {
           if (err) {
               console.log(err);
           }else{
              console.log(info)
           }
           });

    } catch (error) {
              console.log(error);
    }
 }

 


 module.exports = {
     sendResetPasswordLink
 }