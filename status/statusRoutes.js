const express = require("express");
const router = express.Router();
const Status = require("../models/Status");
const { check, query, body } = require("express-validator");

const statusController = require("../status/statusController");




router.post('/add_status', statusController.addStatus);


module.exports = router;