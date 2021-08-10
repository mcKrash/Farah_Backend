const Status = require("../models/Status");
const { validationResult } = require("express-validator");



exports.addStatus = async (req, res, next) => {
    const { status_type, ar_name, en_name } = req.body;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
  
    try {
      const data = await new Status({
        status_type_id,
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