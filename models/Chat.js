/**
 * Chat.js
 * Models used for chat objects stored with mongodb
 */

// Node Modules
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    sender: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("theChat", chatSchema);

module.exports = Chat;
