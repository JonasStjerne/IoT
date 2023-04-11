import noble from "@abandonware/noble";
import { EventEmitter } from "stream";
export default class bluetoothService {
  private actionChaUUID: string;
  private batteryChaUUID: string;
  subscribe: EventEmitter = new EventEmitter();

  constructor(
    serviceUUIDs: string[],
    batteryChaUUID: string,
    actionChaUUID: string
  ) {
    this.actionChaUUID = actionChaUUID;
    this.batteryChaUUID = batteryChaUUID;
    noble.on("stateChange", async (state) => {
      if (state === "poweredOn") {
        console.log("State: ", state);
        console.log("Started scanning for service ", serviceUUIDs);
        noble.startScanning(serviceUUIDs, false);
      }
    });

    noble.on("discover", async (peripheral) => {
      await noble.stopScanningAsync();
      peripheral.on("disconnect", () => {
        this.subscribe.emit("workerDisconnect", peripheral.uuid);
        delete this.connectedDevices[peripheral.uuid];
      });
      await peripheral.connectAsync();
      this.subscribe.emit("workerConnect", peripheral.id);
      const { characteristics } =
        await peripheral.discoverSomeServicesAndCharacteristicsAsync(
          serviceUUIDs,
          [batteryChaUUID, actionChaUUID]
        );
      this.connectedDevices[peripheral.uuid] = characteristics;
      noble.startScanning(serviceUUIDs, false);
    });

    noble.on("warning", (warning: any) => {
      console.log(warning);
    });
  }

  connectedDevices: { [workerUUID: string]: noble.Characteristic[] } = {};

  private logPeripheral(peripheral: noble.Peripheral) {
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
    console.log(
      "\tcan I interest you in any of the following advertised services:"
    );
    console.log("\t\t" + JSON.stringify(peripheral.advertisement.serviceUuids));
  }

  //Send an action to a connect worker over BLE
  sendAction(workerUUID: string) {
    const characteristics = this.connectedDevices[workerUUID];
    if (!characteristics) {
      console.error(`Worker ${workerUUID} not connected`);
      return;
    }
    const actionCharacteristic = characteristics.find(
      (cha) => cha.uuid == this.actionChaUUID
    );
    if (!actionCharacteristic) {
      console.error(
        "Action characteristic not exposed for worker ",
        workerUUID
      );
      return;
    }
    return actionCharacteristic.writeAsync(Buffer.alloc(1, 1, "binary"), false);
  }

  async getBatteryLevel() {
    const batteryLevels: { [workerUUID: string]: number } = {};
    const workerUUIDS = Object.keys(this.connectedDevices);
    for (let i = 0; i < workerUUIDS.length; i++) {
      const characteristic = this.connectedDevices[workerUUIDS[i]].find(
        (cha) => cha.uuid == this.batteryChaUUID
      );
      if (!characteristic) {
        console.error(
          "Battery characteristic not exposed for worker ",
          workerUUIDS[i]
        );
        continue;
      }
      const batteryLevel = (await characteristic.readAsync())[0];
      batteryLevels[workerUUIDS[i]] = batteryLevel;
    }
    return batteryLevels;
  }
}
