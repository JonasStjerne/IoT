require("dotenv").config();
import bluetoothService from "./bluetooth";
import { IWorkerDto } from "./models/worker.dto";
import scheduler from "./scheduler";
import { socketConnection } from "./websocket";

//Settings - keep in code to enable them being updated for deployed hub through GitHhb
const ACTION_SERVICE_UUID = "19b10000e8f2537e4f6cd104768a1214";
const ACTION_CHAR_UUID = "19b10001e8f2537e4f6cd104768a1214";
const BATTERY_SERVICE_UUID = "180f";
const BATTERY_CHAR_UUID = "2a19";
const BATTERY_UPDATE_INTERVAL = 10000;

//Connect to the backend
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

//When connected to backend
socket.on("connect", () => {
  console.log("Connected to backend");
  //Initiate the bluetooth (auto connects to workers)
  const BluetoothService = new bluetoothService(
    [ACTION_SERVICE_UUID, BATTERY_SERVICE_UUID],
    BATTERY_CHAR_UUID,
    ACTION_CHAR_UUID
  );

  //Subscribe to events from the bluetooth service
  BluetoothService.subscribe.on(
    "workerDisconnect",
    (workerId: IWorkerDto["id"]) => {
      console.log("Worker disconnet, with id", workerId);
      sch.cancelWorkerJobs(workerId);
      socket.emit("workerDisconnect", workerId);
    }
  );

  BluetoothService.subscribe.on(
    "workerConnect",
    (workerId: IWorkerDto["id"]) => {
      console.log("Worker  connect, with id", workerId);
      socket.emit("workerConnect", workerId);
    }
  );

  //Start polling for battery updates from the workers at a interval
  let currentBatteryLevels: {
    [workerUUID: string]: number;
  } = {};
  setInterval(async () => {
    //Get battery level for all connected devices
    const batteryData = await BluetoothService.getBatteryLevel();
    //If there are changes to any of the battery levels send them all
    if (currentBatteryLevels != batteryData) {
      currentBatteryLevels = batteryData;
      socket.emit("batteryData", batteryData);
    }
  }, BATTERY_UPDATE_INTERVAL);

  //Initiate the scheduler with a callback function which will be called when actions are firering
  const sch = new scheduler((id) => BluetoothService.sendAction(id));

  //When getting worker data
  socket.on("workerData", (data: IWorkerDto) => {
    //Schedule the workers actions
    sch.scheduleActions(data);
  });

  socket.on("instantAction", (workerId: string) => {
    BluetoothService.sendAction(workerId);
  });
});

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
// sch.scheduleActions(workerData);
