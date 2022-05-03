const { addMessage,
     getMessages,
     addReminder } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/getrmd/", addReminder);

module.exports = router;
