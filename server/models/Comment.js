const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: { type: String, required: [true, "Please enter a text"]},
  // user: User,
  // child,
  // parent,
  date: {
    type: Date,
    default: new Date(),
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
