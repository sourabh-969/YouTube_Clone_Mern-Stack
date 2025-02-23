const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    channelId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    cover: { type: String },
    videoUrl: { type: String, required: true },
    views: { type: Number },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
