/**
 * index.js
 * Entry file to start express chat server
 */

// Node Modules
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");
const dateTime = require("simple-datetime-formater");
const express = require("express");
const io = require("socket.io");
const loginRouter = require("./route/loginRoute");

//require the http module
const app = express();
const http = require("http").Server(app);
const port = 5000;

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/chats", chatRouter);
app.use("/login", loginRouter);

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//integrating socketio
socket = io(http);

//database connection
const Chat = require("./models/Chat");
const connect = require("./dbconnect");

// Setup event listener for chat users to start session
socket.on("connection", socket => {
  console.log("user connected");

  // User disconnects
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // User begins typing
  socket.on("typing", data => {
    socket.broadcast.emit("notifyTyping", {
      user: data.user,
      message: data.message
    });
  });

  // User stops typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("notifyStopTyping");
  });

  // User sending chat message
  socket.on("chat message", function(msg) {
    console.log("message: " + msg);

    // Broadcast message to everyone in port:5000 except sender.
    socket.broadcast.emit("received", { message: msg });

    // Save chat message to the database
    connect.then(db => {
      console.log("connected correctly to the server");
      let chatMessage = new Chat({ message: msg, sender: "Anonymous" });

      chatMessage.save();
    });
  });
});

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
