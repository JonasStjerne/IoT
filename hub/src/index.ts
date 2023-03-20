require("dotenv").config();
var io = require("socket.io-client");
var socket = io.connect(`http://${process.env.BACKEND_HOST}${process.env.BACKEND_PORT}`, {
  reconnection: true,
  extraHeaders: {
    Authorization: `Basic ${process.env.HUB_ID}.${process.env.HUB_SECRET}`,
  },
});

socket.on("connect", function () {
  console.log("connected to localhost:3000");

  //Send connected workers to server
  socket.emit("connectedWorkers", []);

  //Get worker data (incl. actions) from server
  socket.on("workerData", function (data: any) {
    console.log("workerData from the server:", data);
  });

  setInterval(function () {
    socket.emit("serverEvent", Math.random());
    // socket.emit("getWorkerData");
    console.log("message sent to the server");
  }, 10000);
});

// socket.on("clientEvent", function (data: any) {
//   console.log("message from the server:", data);
//   socket.emit("serverEvent", "thanks server! for sending '" + data + "'");
// });
