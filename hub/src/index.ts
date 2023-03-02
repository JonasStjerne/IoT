console.log("Hello world!");
var io = require("socket.io-client");
var socket = io.connect("http://backend_dev:3000", {
  reconnection: true,
  extraHeaders: {
    Authorization: "Basic b177b712-3188-40df-b2b8-8672a07d2393.87e6e107-26c0-4b48-8fe9-56868c5b3c84",
  },
});

socket.on("connect", function () {
  console.log("connected to localhost:3000");
  socket.on("clientEvent", function (data: any) {
    console.log("message from the server:", data);
    socket.emit("serverEvent", "thanks server! for sending '" + data + "'");
  });
  setInterval(function () {
    socket.emit("serverEvent", Math.random());
    // socket.emit("getWorkerData");
    console.log("message sent to the server");
  }, 10000);
});
