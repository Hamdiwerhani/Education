const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: String,
    speciality: String,
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "parent"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    telephone: Number,
    childTelephones: [Number],
    success: { type: Boolean, default: false },
    photo: String,
    cv: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
