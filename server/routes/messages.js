const { addMessage, getMessages, addAttachment } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/addatch/", addAttachment);
router.post("/getmsg/", getMessages);

module.exports = router;
