var mongoose = require("mongoose");

var statusSchema = mongoose.Schema({
  status_id: {
    type: Number,
    required: true,
  },
  ar_name: { type: String },

  en_name: { type: String },
});

module.exports = mongoose.model("Status", statusSchema);
