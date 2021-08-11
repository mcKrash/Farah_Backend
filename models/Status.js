const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  status_id: {
    type: Number,
    required: true,
  },
  ar_name: { type: String },

  en_name: { type: String },
});

module.export = mongoose.model("Status", statusSchema);
