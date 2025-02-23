const express = require("express");
const controller = require("../controllers/videoController");
const verifyToken = require("../helps/verify");

const router = express.Router();

router.get("/", controller.getVideos);
router.get("/:id", controller.getVideo);
router.get("/channel/:id", controller.getVideosByChannelId);

router.post("/", verifyToken, controller.createVideo);
router.delete("/:id", verifyToken, controller.deleteVideo);
router.put("/:id", verifyToken, controller.updateVideo);
router.put("/like/:videoId", verifyToken, controller.likeVideo);
router.put("/dislike/:videoId", verifyToken, controller.dislikeVideo);

module.exports = router;
