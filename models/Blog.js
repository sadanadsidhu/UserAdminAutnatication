const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
