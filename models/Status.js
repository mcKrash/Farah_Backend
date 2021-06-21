const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  ar_name: { type: String },

  en_name: { type: String },
});

module.export = mongoose.model("Status", statusSchema);
