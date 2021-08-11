const Status = require("../models/Status");


exports.addStatus = async (req, res, next) => {
    const { status_type_id, ar_name, en_name } = req.body;
  
    try {
      const data = new Status({
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
      console.log(error);
      res.status(500).json({ error: error });
    }
  };