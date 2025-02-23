const express = require("express");
const router = express.Router();
const { postComment } = require("../controllers/commentController");

router.post("/:id/comments", postComment);

module.exports = router;