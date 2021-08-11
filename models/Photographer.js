const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photographerSchema = new Schema(
  {
    provider_type: {
      type: mongoose.Types.ObjectId,
      ref: "Provider_Types",
      required: true,
    },
    name: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },

    phone: { type: Number },

    token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photographer", photographerSchema);
