const Hall = require("../models/Halls");
const ProviderType = require("../models/Provider_Types");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;

const cloudName = process.env.CLOUD_NAME;
const cloudApiKey = process.env.CLOUD_API_KEY;
const cloudApiSecret = process.env.CLOUD_API_SECRET;

exports.hallSignup = async (req, res, next) => {
  const {
    provider_type_id,
    status_id,
    name,
    email,
    phone,
    password,
    food,
    Capacity,
    hall_presentation_imges,
    scheduall,
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const data = await new Hall({
      status_id,
      provider_type_id,
      name,
      email,
      phone,
      password: hashedPassword,
      food,
      Capacity,
      hall_presentation_imges,
      scheduall,
    });
    await data
      .save()
      .then((value) => {
        data.populate('Provider_Type', function(err) {
          res.status(201).json({ message: data });
         });
        
      })  
      .catch((err) => {
        console.log(err);
        return res.status(503).json({ message: err });
      });
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
      // .populate("status")
      //       .populate("provider_type")
      //       .exec()
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

exports.uploadImages = async (req, res, next) => {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecret,
  });

  try {
    const file = req.files.image;
    console.log(file);

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    console.log(result);
    res.status(200).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
exports.hallMainImage = async (req, res, next) => {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecret,
  });
  const file = req.files.hall_main;
  const { email } = req.body;
  console.log(file);

  const result = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log(err, result)
  })

  try {
    await Hall.updateOne(
      email,
      {
        $set: { profile_img: result.secure_url },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          res.status(422).json({ message: err });
        } else {
          res.status(200).json({ message: result });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
