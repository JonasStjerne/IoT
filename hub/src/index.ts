require("dotenv").config();
import scheduler from "./scheduler";
import { ActionRepeat } from "./models/action.dto";
import { IWorkerDto, WorkerAction, WorkerState, WorkerStatus } from "./models/worker.dto";
import { socketConnection } from "./websocket";
import noble from "@abandonware/noble";
import bluetoothService from "./bluetooth";

const ACTION_SERVICE_UUID = "19b10000e8f2537e4f6cd104768a1214";
const ACTION_CHAR_UUID = "19b10001e8f2537e4f6cd104768a1214";
const BATTERY_SERVICE_UUID = "180f";
const BATTERY_CHAR_UUID = "2a19";

const BluetoothService = new bluetoothService(
  [ACTION_SERVICE_UUID, BATTERY_SERVICE_UUID],
  BATTERY_CHAR_UUID,
  ACTION_CHAR_UUID
);

BluetoothService.eventEmitter.on("workerDisconnected", (workerId: IWorkerDto["id"]) => {});

setInterval(async () => {
  const batteryData = await BluetoothService.getBatteryLevel();
  console.log(batteryData);
}, 1000);
// const socket = socketConnection(
//   {
//     backendHost: "localhost",
//     backendPort: 3000,
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

//Test data for scheduling
// const workerData: IWorkerDto[] = [
//   {
//     id: "id",

//     name: "name",

//     action: WorkerAction.PRESS,

//     status: WorkerStatus.IDLE,

//     state: WorkerState.ONLINE,

//     actions: [
//       {
//         id: "action1",
//         repeat: ActionRepeat.ONCE,

//         executeDateTime: new Date(Date.now() + 5000),

//         durationSeconds: 1,

//         isComplete: false,
//       },
//       {
//         id: "action1",
//         repeat: ActionRepeat.ONCE,

//         executeDateTime: new Date(Date.now() + 10000),

//         durationSeconds: 1,

//         isComplete: false,
//       },
//     ],
//   },
// ];
// const sch = new scheduler(bluetoothService);
// sch.scheduleActions(workerData);
