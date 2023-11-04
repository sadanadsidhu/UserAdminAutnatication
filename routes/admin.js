const router = require("express").Router();
const Admin = require("../models/Admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

///register
router.post("/register", async (req, res) => {
  const existingUser = await Admin.findOne({ email: req.body.email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Admin is already in use you cant register again" });
  }
  const newUser = new Admin({
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    address: req.body.address,
  });
  console.log("newUser", newUser);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
///////////login--------------------------
router.post("/login", async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong creaditianls");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.password &&
      res.status(401).json("wrong creaditinals");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    console.log("otherr auth", others);

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
