const express = require("express");
const router = express.Router();




const statusController = require("../status/statusController");




router.post('/add_status', statusController.addStatus);


module.exports = router;