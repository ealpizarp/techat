const Messages = require("../models/messageModel");
const Attachments = require("../models/attachmentModel")
const fs = require("fs");
const { text } = require("express");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('TecHatieowkszloqas');



module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      var finalMessage = msg.message.text;
      if (msg.type === "text"){
        finalMessage = cryptr.decrypt(msg.message.text);
      }
      return {
        fromSelf: msg.sender.toString() === from,
        message: finalMessage,
        type: msg.type,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, type } = req.body;
    var finalMessage = message;

    if(type == "text") {
      finalMessage = cryptr.encrypt(message);
    }

    const data = await Messages.create({
      message: { text: finalMessage },
      type: type,
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addAttachment = async (req, res, next) => {
  try {
    const { from, to, message, type } = req.body;
    const data = await Attachments.create({
      message: { file: message },
      type: type,
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};