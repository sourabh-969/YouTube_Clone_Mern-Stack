const Video = require("../models/Video");
const Comment = require("../models/Comment");

// Controller to post a comment
const postComment = async (req, res) => {
  try {
    const { id } = req.params; // getting Video ID from URl
    const { desc } = req.body; // Comment text

    // Find the video
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Create a new comment
    const newComment = new Comment({videoId: id,desc,channelId: req.channel.id, });

    // Save the comment
    await newComment.save();

    // Add the comment to video's comments array
    video.comments.push(newComment._id);
    await video.save();

    res.status(200).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to post comment" });
  }
};

module.exports = { postComment };