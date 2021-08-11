const express = require("express");
const router = express.Router();
const Provider = require("../models/Halls");
const { check, query, body } = require("express-validator");

const providerController = require("../providers/providersController");

router.post(
    "/hall_register",[
  
    check("email").custom((value) => {
      return Provider.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("This Email Is Already In Use");
        }
      });
    }),
    check("phone").custom((value) => {
      return Provider.findOne({phone : value }).then((phone) => {
        if(phone){
          return Promise.reject("This Phone Is Already In Use");
        }
      });
    }),
    body("name", "Please Enter a name").not().isEmpty(),
    body('provider_type', 'provider_type Is Required'),
    body('status_id', 'status_id'),
    body('password', 'please Enter password | Password min Length : 6  ').isLength({min: 6})
    
  ],providerController.hallSignup);


  router.post('/add_provider_type', providerController.addProviderType);
  router.post('/upload', providerController.uploadImages);

  module.exports = router;