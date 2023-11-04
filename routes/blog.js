const router = require("express").Router();
const Blog = require("../models/Blog");



///register
router.post("/create", async (req, res) => {

  const newUser = new Blog({
    title: req.body.title,
    desc: req.body. desc,
  });
//   console.log("newUser", newUser);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;