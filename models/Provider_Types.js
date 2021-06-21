const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerTypesSchema = new Schema({
  provider_type_id: { type: mongoose.Types.ObjectId, required: true },
  ar_name: { type: String },
  en_name: { type: String },
});

module.exports = mongoose.model("Provider_Type", providerTypesSchema);
