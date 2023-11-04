const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const blogRoute = require("./routes/blog");
require("dotenv").config();

mongoose
  .connect("mongodb://localhost:27017/EightyFive")
  .then(() => console.log("DBConnection successfully"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);

// const secretKey = process.env.PASS_SEC;

// console.log(secretKey); // my-secret-key

app.listen(5000, () => {
  console.log("Backend is connected");
});
