import noble from '@abandonware/noble';

// noble.on('stateChange', async (state) => {
//   console.log(state);
//   if (state === 'poweredOn') {
//     await noble.startScanningAsync([]);
//   }
// });

noble.on('scanStart', () => {
  console.log("Started Scanning");
});

noble.on('warning', (warning: any) => {
  console.log(warning);
});

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(['19b10000-e8f2-537e-4f6c-d104768a1214'], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  console.log('peripheral discovered (' + peripheral.id +
              ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
              ' connectable ' + peripheral.connectable + ',' +
              ' RSSI ' + peripheral.rssi + ':');
  console.log('\thello my local name is:');
  console.log('\t\t' + peripheral.advertisement.localName);
  console.log('\tcan I interest you in any of the following advertised services:');
  console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    console.log('\there is my service data:');
    for (var i in serviceData) {
      console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
    }
  }
  if (peripheral.advertisement.manufacturerData) {
    console.log('\there is my manufacturer data:');
    console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
  }
  if (peripheral.advertisement.txPowerLevel !== undefined) {
    console.log('\tmy TX power level is:');
    console.log('\t\t' + peripheral.advertisement.txPowerLevel);
  }

  console.log();
});




// noble.on('discover', async (peripheral) => {
//   console.log("Found device", peripheral);
//   await noble.stopScanningAsync();
//   await peripheral.connectAsync();
//   console.log("Connected to device");
//   // const {characteristics} = await peripheral.discoverSomeServicesAndCharacteristicsAsync(['180f'], ['2a19']);
//   // const batteryLevel = (await characteristics[0].readAsync())[0];

//   // console.log(`${peripheral.address} (${peripheral.advertisement.localName}): ${batteryLevel}%`);

//   await peripheral.disconnectAsync();
//   console.log("Disconnected")
//   process.exit(0);
// });

// var io = require("socket.io-client");
// var socket = io.connect("http://backend_dev:3000", {
//   reconnection: true,
//   extraHeaders: {
//     Authorization: "Basic b177b712-3188-40df-b2b8-8672a07d2393.87e6e107-26c0-4b48-8fe9-56868c5b3c84",
//   },
// });

// socket.on("connect", function () {
//   console.log("connected to localhost:3000");

//   //Send connected workers to server
//   socket.emit("connectedWorkers", []);

//   //Get worker data (incl. actions) from server
//   socket.on("workerData", function (data: any) {
//     console.log("workerData from the server:", data);
//   });

//   setInterval(function () {
//     socket.emit("serverEvent", Math.random());
//     // socket.emit("getWorkerData");
//     console.log("message sent to the server");
//   }, 10000);
// });

// // socket.on("clientEvent", function (data: any) {
// //   console.log("message from the server:", data);
// //   socket.emit("serverEvent", "thanks server! for sending '" + data + "'");
// // });
