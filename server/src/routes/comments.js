const express = require("express");
const router = express.Router();
const { postComment } = require("../controllers/commentController");
const verifyToken = require("../helps/verify.js");

router.post("/:id/comments", verifyToken, postComment);

module.exports = router;