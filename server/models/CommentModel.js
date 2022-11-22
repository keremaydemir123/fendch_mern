const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  message: { type: String, required: [true, "Please enter a text"] },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  parentId: String,
  children: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
  ],
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
