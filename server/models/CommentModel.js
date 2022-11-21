const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  message: { type: String, required: [true, "Please enter a text"] },
  likes: Number,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  // user: User,
  // child,
  // parent,
  date: {
    type: Date,
    default: new Date(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
