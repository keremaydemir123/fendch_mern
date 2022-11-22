const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  message: { type: String, required: [true, "Please enter a text"] },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  parent: { type: mongoose.Schema.Types.ObjectId || String, ref: "Comment" },
  childs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  // user: User,
  date: {
    type: Date,
    default: new Date(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
