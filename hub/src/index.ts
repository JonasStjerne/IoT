require("dotenv").config();
import scheduler from "./scheduler";
import { ActionRepeat } from "./models/action.dto";
import { IWorkerDto, WorkerAction, WorkerState, WorkerStatus } from "./models/worker.dto";
import { socketConnection } from "./websocket";

const workerData: IWorkerDto[] = [
  {
    id: "id",

    name: "name",

    action: WorkerAction.PRESS,

    status: WorkerStatus.IDLE,

    state: WorkerState.ONLINE,

    actions: [
      {
        id: "action1",
        repeat: ActionRepeat.ONCE,

        executeDateTime: new Date(Date.now() + 5000),

        durationSeconds: 1,

        isComplete: false,
      },
    ],
  },
];
const sch = new scheduler();
sch.scheduleActions(workerData);

// const socket = socketConnection(
//   {
//     backendHost: process.env.BACKEND_HOST!,
//     backendPort: +process.env.BACKEND_PORT!,
//   },
//   {
//     hubId: process.env.HUB_ID!,
//     hubSecret: process.env.HUB_SECRET!,
//   }
// );

// socket.on("connect", () => {
//   console.log("connected to localhost:3000");

//   //Send connected workers to server
//   socket.emit("connectedWorkers", []);

//   //Get worker data (incl. actions) from server
//   socket.on("workerData", function (data: any) {
//     console.log("workerData from the server:", data);
//   });

//   //Function for debuggin websocket connection
//   setInterval(function () {
//     socket.emit("serverEvent", Math.random());
//     // socket.emit("getWorkerData");
//     console.log("message sent to the server");
//   }, 10000);
// });

// socket.on("clientEvent", function (data: any) {
//   console.log("message from the server:", data);
//   socket.emit("serverEvent", "thanks server! for sending '" + data + "'");
// });
