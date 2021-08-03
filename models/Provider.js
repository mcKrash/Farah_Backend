const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerSchema = new Schema({

  provider_type_id: {
    type: mongoose.Types.ObjectId,
    ref: "Provider_Types",
    required: true
  },

  name: { type: String, required: true },

  phone: { type: Number},

  email: { type: String, required: true },

  password: { type: String, required: true },

  profile_img: { type: String, required: false, default: "default.png" },

  description: { type: String, required: true },
});

module.exports = mongoose.model("Provider", providerSchema);
