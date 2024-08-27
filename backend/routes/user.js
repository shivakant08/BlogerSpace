const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comments");
const verifyToken = require("../verifyToken");

//Update

router.put("/:id", verifyToken, async (req, res) => {
  const password = req.body.password;
  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
    }
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

//Delete
router.get("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
