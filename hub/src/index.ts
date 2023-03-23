require("dotenv").config();
import scheduler from "./scheduler";
import { ActionRepeat } from "./models/action.dto";
import { IWorkerDto, WorkerAction, WorkerState, WorkerStatus } from "./models/worker.dto";
import { socketConnection } from "./websocket";
import noble, { Characteristic } from "@abandonware/noble";

const SERVICE_UUID = "19b10000e8f2537e4f6cd104768a1214";
const BATTERY_SERVICE = "180f";
noble.on("scanStart", () => {
  console.log("Started Scanning");
});

noble.on("warning", (warning: any) => {
  console.log(warning);
});

noble.on("stateChange", function (state) {
  if (state === "poweredOn") {
    noble.startScanning([SERVICE_UUID, BATTERY_SERVICE], true);
  } else {
    noble.stopScanning();
  }
});

function logPeripheral(peripheral: noble.Peripheral) {
  console.log(
    "peripheral discovered (" +
      peripheral.id +
      " with address <" +
      peripheral.address +
      ", " +
      peripheral.addressType +
      ">," +
      " connectable " +
      peripheral.connectable +
      "," +
      " RSSI " +
      peripheral.rssi +
      ":"
  );
  console.log("\thello my local name is:");
  console.log("\t\t" + peripheral.advertisement.localName);
  console.log("\tcan I interest you in any of the following advertised services:");
  console.log("\t\t" + JSON.stringify(peripheral.advertisement.serviceUuids));
}

//Event for when a peripheral is discovered

noble.on("discover", function (peripheral) {
  logPeripheral(peripheral);

  //stop scanning before connecting
  noble.stopScanning();
  connect(peripheral);
});

//Connect to the peripheral
function connect(peripheral: noble.Peripheral) {
  peripheral.on("disconnect", function () {
    process.exit(0);
  });

  peripheral.once("connect", () => {
    console.log("Connected!!!");
    peripheral.discoverSomeServicesAndCharacteristics(
      [SERVICE_UUID, BATTERY_SERVICE],
      [],
      discoveredServicesAndCharacteristics
    );
  });

  peripheral.connect();
}

function discoveredServicesAndCharacteristics(
  error: string,
  services: noble.Service[],
  characteristics: noble.Characteristic[]
) {
  console.log("Services ", services);
  console.log("Characteristics ", characteristics);
  characteristics.forEach((characteristic) => {
    switch (characteristic.uuid) {
      case "19b10001e8f2537e4f6cd104768a1214":
        characteristic.write(Buffer.alloc(1, 1, "binary"), false);
        break;
      case "2a19":
        characteristic.on("data", (data, isNotifaction) => {
          console.log("Battery level: ", data);
        });
        characteristic.subscribe((error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Subscribed to battery");
          }
        });
        break;
    }
  });
}

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
// const sch = new scheduler();
// sch.scheduleActions(workerData);
