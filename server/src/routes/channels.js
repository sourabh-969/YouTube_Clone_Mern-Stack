const express = require("express");
const controller = require("../controllers/channelController");
const verifyToken = require("../helps/verify");

const router = express.Router();

router.get("/:id", controller.getChannel);
router.put("/:id", verifyToken, controller.updateChannel);
router.put("/subscribe/:id", verifyToken, controller.subscribeChannel);
router.put("/unsubscribe/:id", verifyToken, controller.unsubscribeChannel);

module.exports = router;
