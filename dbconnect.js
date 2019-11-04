/**
 * dbconnect.js
 * Provides connection to database for server
 */

// Node Modules
const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
const url = "mongodb://localhost:27017/chat";
const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;
