const Provider = require("../models/Provider");
const ProviderType = require("../models/Provider_Types");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const { validationResult } = require("express-validator");

exports.providerSignup = async (req, res, next) => {
  const { provider_type_id, name, email, phone, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const data = await new Provider({
      provider_type_id,
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await data
      .save()
      .then((value) => {
        console.log(value);
        res.status(201).json({ message: value });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.addProviderType = async (req, res, next) => {
  const { provider_type_id, ar_name, en_name } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    const data = await new ProviderType({
      provider_type_id,
      ar_name,
      en_name,
    });
    await data
      .save()
      .then((value) => {
        console.log(value);
        res.status(201).json({ message: value });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
