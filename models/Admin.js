const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
      // _id: { type: Number, required: true },
    //   username: { type: String, required: false, unique: false },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: false },
      
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Admin", AdminSchema);