var mongoose = require("mongoose");

var statusSchema = mongoose.Schema({
  
  ar_name: { type: String },

  en_name: { type: String },
});

module.exports = mongoose.model("Status", statusSchema);
