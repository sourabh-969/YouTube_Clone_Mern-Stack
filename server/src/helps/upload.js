const multer = require("multer");
const path = require("path");

const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../assets/covers");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
     cb(null,req.body.filename);
  },
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../assets/profiles");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../assets/videos");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../assets/banners");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const uploadCover = multer({ storage: coverStorage });
const uploadProfile = multer({ storage: profileStorage });
const uploadVideo = multer({ storage: videoStorage });
const uploadBanner = multer({ storage: bannerStorage });

module.exports = { uploadCover, uploadProfile, uploadVideo, uploadBanner };
