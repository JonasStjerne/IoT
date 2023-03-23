require("dotenv").config();
import scheduler from "./scheduler";
import { ActionRepeat } from "./models/action.dto";
import { IWorkerDto, WorkerAction, WorkerState, WorkerStatus } from "./models/worker.dto";
import { socketConnection } from "./websocket";
import noble, { Characteristic } from "@abandonware/noble";

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

noble.on("discover", function (peripheral) {
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

  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    console.log("\there is my service data:");
    for (var i in serviceData) {
      console.log(
        "\t\t" + JSON.stringify(serviceData[i].uuid) + ": " + JSON.stringify(serviceData[i].data.toString("hex"))
      );
    }
  }
  if (peripheral.advertisement.manufacturerData) {
    console.log("\there is my manufacturer data:");
    console.log("\t\t" + JSON.stringify(peripheral.advertisement.manufacturerData.toString("hex")));
  }
  if (peripheral.advertisement.txPowerLevel !== undefined) {
    console.log("\tmy TX power level is:");
    console.log("\t\t" + peripheral.advertisement.txPowerLevel);
  }
  //stop scanning before connecting
  noble.stopScanning();
  connect(peripheral);
});

function connect(peripheral: noble.Peripheral) {
  peripheral.on("disconnect", function () {
    process.exit(0);
  });

  peripheral.connect(() => {
    console.log("Connecting");

    peripheral.discoverServices([SERVICE_UUID, BATTERY_SERVICE], (error, services) => {
      console.log("Services ", services);

      services.forEach((service) => {
        console.log(service.uuid);
        service.discoverCharacteristics([], (error, characteristics) => {
          console.log(characteristics);
          if (characteristics[0].uuid === "19b10001e8f2537e4f6cd104768a1214") {
            characteristics[0].write(Buffer.alloc(1, 1, "binary"), false);

            characteristics[0].once("write", (error: any) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Wrote to gesture");
              }
            });
          } else {
            console.log("Battery characteristic found");
            characteristics[0].subscribe();
            characteristics[0].notify(true);
            characteristics[0].once("notify", (state) => {
              console.log("Battery level: ", state);
            });
          }
        });
      });
    });
  });
  peripheral.once("connect", () => {
    console.log("Connected!!!");
  });
}

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
