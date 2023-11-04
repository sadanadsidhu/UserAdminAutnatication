const { AES } = require("crypto-js");
const User = require("../models/User");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

/// update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
/////Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


///-------GET USER by id--------------->>

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    // console.log("paramss",req.params.id);
  try {
    const user = await User.findById(req.params.id);
    // console.log("rrrrrrr",user);

    const { password, ...others } = user._doc;
    res.status(200).json({ others });
    // console.log("othhersss",others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
