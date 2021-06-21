const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validationError = require('express-validator');



exports.userSignup = async (req, res, next) => {

  var { name, email, phone, password } = req.body;

  const errors = validationError(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt )

  try {
    let data = await new User({
      name, email, phone,  password: hashedPassword
    });
    const savedUser = await data.save()
      .then((res) => {
        console.log(res)
        res.status(201).json(res);
      }).catch(err => console.log(err));
  } catch (error) {
    res.status(500).json({error: error});
  }
}

exports.userLogin = async (req, res, next) => {
  

};
