const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    channelId: { type: String, required: true },
    videoId: { type: String, required: true },
    desc: { type: String, required: true },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
