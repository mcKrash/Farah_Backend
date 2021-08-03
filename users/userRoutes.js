const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, query, body } = require("express-validator");

const userControllers = require("../users/userController");

router.post(
  "/register",[

  // check("email").custom((value) => {
  //   return User.findOne({ email: value }).then((user) => {
  //     if (user) {
  //       return Promise.reject("This Email Is Already In Use");
  //     }
  //   });
  // }),
  // check("phone").custom((value) => {
  //   return User.findOne({phone : value }).then((phone) => {
  //     if(phone){
  //       return Promise.reject("This Phone Is Already In Use");
  //     }
  //   });
  // }),

  body("name", "Please Enter a name").not().isEmpty(),
  body("email", "Please Enter a email").not().isEmpty(),
  body("phone", "Please Enter a Valid Phone").isLength({
    min: 9
  }),
  body('password', 'please Enter password').isLength({min: 6})
  
],userControllers.userLogin);

router.post("/login", userControllers.userLogin);

module.exports = router;
