const mongoose = require("mongoose");

const AttachmentSchema = mongoose.Schema(
  {
    message: {
      file: {type: Buffer, required: true },
    },
    users: Array,
    type: {type: String, required: true},
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attachments", AttachmentSchema);
