const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hallSchema = new Schema({
  
  provider_type: {
    type: mongoose.Types.ObjectId,
    ref: "Provider_Types",
    required: true,
  },
  status_type: {
    type: mongoose.Types.ObjectId,
    ref: "Status",
    required: true,
  },

  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  profile_img: { type: String, required: false, default: "default.png" },

  description: { type: String, required: true },

  food: {
    buffet: { type: Boolean, default: false, description: String },
    dish: { type: Boolean, default: false, description: String }
  },

  Capacity: {
    chairs: { type: Number },
    tables: { type: Number }
  },

  show_imges: { type: String },

  scheduall: { date_time:{ type: Date}},

  token: { type: String, default: null },

  rate: {type: Number, default: 0}
},
{ timestamps: true }
);

module.exports = mongoose.model("Hall", hallSchema);
