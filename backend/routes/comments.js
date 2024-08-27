const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comments");
const verifyToken = require("../verifyToken");

//Create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete

router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Comment
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ PostId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
