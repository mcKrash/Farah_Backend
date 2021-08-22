const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerTypesSchema = new Schema({
  
  ar_name: { type: String },
  en_name: { type: String },
});

module.exports = mongoose.model("Provider_Type", providerTypesSchema);
