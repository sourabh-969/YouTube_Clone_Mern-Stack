const express = require("express");
const {
  uploadCover,
  uploadProfile,
  uploadVideo,
  uploadBanner,
} = require("../helps/upload");
const verifyToken = require("../helps/verify");

const router = express.Router();

router.post("/covers", verifyToken, uploadCover.single("file"), (req, res) => {
  res.status(200).json("cover uploaded.");
});

router.post(
  "/profiles",
  verifyToken,
  uploadProfile.single("file"),
  (req, res) => {
    res.status(200).json("profile uploaded.");
  }
);

router.post("/videos", verifyToken, uploadVideo.single("file"), (req, res) => {
  res.status(200).json("video uploaded.");
});

router.post(
  "/banners",
  verifyToken,
  uploadBanner.single("file"),
  (req, res) => {
    res.status(200).json("video uploaded.");
  }
);

module.exports = router;
