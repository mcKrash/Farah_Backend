const Status = require("../models/Status");




exports.addStatus = async (req, res, next) => {
    const { provider_type_id, ar_name, en_name } = req.body;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
  
    try {
      const data = await new Status({
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