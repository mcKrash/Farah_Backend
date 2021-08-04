const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const { check, query, body } = require("express-validator");

const userController = require("../users/userController");

router.post(
  "/register",[

  check("email").custom((value) => {
    return Client.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject("This Email Is Already In Use");
      }
    });
  }),
  check("phone").custom((value) => {
    return Client.findOne({phone : value }).then((phone) => {
      if(phone){
        return Promise.reject("This Phone Is Already In Use");
      }
    });
  }),

  body("name", "Please Enter a name").not().isEmpty(),
  body('password', 'please Enter password | Password min Length : 6  ').isLength({min: 6})
  
],userController.userSignup);

router.post("/login", userController.userLogin);

module.exports = router;
