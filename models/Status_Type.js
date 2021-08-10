const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusTypeSchema = new Schema({
  status_type_id: {
    type: Number,
    required: true,
  },
  ar_name: { type: String },

  en_name: { type: String },
});

module.export = mongoose.model("Status", statusTypeSchema);
