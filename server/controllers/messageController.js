const Messages = require("../models/messageModel");
const { text } = require("express");
var moment = require('moment');
const Twilio = require('twilio');
require('dotenv').config();

const Cryptr = require('cryptr');
const { REFUSED } = require("dns");
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
      if (msg.type === "text") {
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
    
    if(type === "text") {
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

module.exports.addReminder = async (req, res, next) => {

  try {

    const { username, reminder, cellnumber,date,time } = req.body;

    var appointmentDT = moment(date+" "+time);
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = new Twilio(accountSid, authToken);
    const options = {
        to: cellnumber,
        from: process.env.TWILIO_SID_MSG,
        scheduleType: 'fixed',
        sendAt: appointmentDT.toISOString(),
        body: `Hi ${username}. Techat le recuerda ${reminder}.`,
    };
  
    client.messages.create(options, function(err) {
        if (err) {
            return res.json({ msg: "an error has occured adding the message"});
        } else {
            return res.json({ msg: "reminder added succesfully"});
        }
    });

  } catch (ex) {
    next(ex);
  }

}
