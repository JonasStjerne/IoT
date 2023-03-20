require("dotenv").config();
import { socketConnection } from "./websocket";

const socket = socketConnection(
  {
    backendHost: process.env.BACKEND_HOST!,
    backendPort: +process.env.BACKEND_PORT!,
  },
  {
    hubId: process.env.HUB_ID!,
    hubSecret: process.env.HUB_SECRET!,
  }
);

socket.on("connect", () => {
  console.log("connected to localhost:3000");

  //Send connected workers to server
  socket.emit("connectedWorkers", []);

  //Get worker data (incl. actions) from server
  socket.on("workerData", function (data: any) {
    console.log("workerData from the server:", data);
  });

  //Function for debuggin websocket connection
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
