const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hallSchema = new Schema(
  {
    provider: {
      type: mongoose.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    status: {
      type: mongoose.Types.ObjectId,
      ref: "Status",
      required: true,
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },

    profile_img: { type: String, required: false, default: "default.png" },

    description: {
      type: String,
      required: true,
      default: "No Discription Provieded Yet",
    },

    food: {
      buffet: { type: Boolean, default: false, description: String },
      dish: { type: Boolean, default: false, description: String },
    },

    Capacity: {
      chairs: { type: Number, default: 0 },
      tables: { type: Number, default: 0 },
    },

    hall_presentation_imges: [{ type: String, default: "image.png" }],

    scheduall: {
      start_date: { type: Date, default: Date.now() },
      end_date: { type: Date, default: Date.now() },
    },

    token: { type: String, default: null },

    rate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hall", hallSchema);
