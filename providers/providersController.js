const Provider = require("../models/Provider");
const ProviderType = require("../models/Provider_Types");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;

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

exports.imgeTest = async (req, res, next) => {
  const { profile_img } = req.body;

  cloudinary.uploader.upload(profile_img, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
};

// if (req.url === '/upload' && req.method.toLowerCase() === 'post') {

//   // parse a file upload
//   const form = new Formidable();

//   form.parse(req, (err, fields, files) => {

//       // Find Cloudinary documentation using the link below
//       // https://cloudinary.com/documentation/upload_images
//       cloudinary.uploader.upload(files.upload.path, result => {

//           // This will return the output after the code is exercuted both in the terminal and web browser
//           // When successful, the output will consist of the metadata of the uploaded file one after the other. These include the name, type, size and many more.
//           console.log(result)
//           if (result.public_id) {

//           // The results in the web browser will be returned inform of plain text formart. We shall use the util that we required at the top of this code to do this.
//               res.writeHead(200, { 'content-type': 'text/plain' });
//               res.write('received uploads:\n\n');
//               res.end(util.inspect({ fields: fields, files: files }));
//           }
//       });
//   });
//   return;
// }
