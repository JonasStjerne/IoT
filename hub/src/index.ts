console.log("Hello world!");
var io = require("socket.io-client");
var socket = io.connect("http://backend_dev:3000", {
  reconnection: true,
  extraHeaders: {
    Authorization: "Basic 5b6a71c1-92d8-47d2-9a76-9cf506db2480.c5a41e6a-f1ad-4a65-9340-0ca735a88293	",
  },
});

socket.on("connect", function () {
  console.log("connected to localhost:3000");
  socket.on("clientEvent", function (data: any) {
    console.log("message from the server:", data);
    socket.emit("serverEvent", "thanks server! for sending '" + data + "'");
  });
  setInterval(function () {
    // socket.emit("serverEvent", Math.random());
    socket.emit("getWorkerData");
    console.log("message sent to the server");
  }, 10000);
});
