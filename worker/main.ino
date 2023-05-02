#include <ArduinoBLE.h>
 
const char* deviceServiceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";
const char* deviceServiceCharacteristicUuid = "19b10001-e8f2-537e-4f6c-d104768a1214";

int action = -1;

BLEService actionService(deviceServiceUuid); 
BLEByteCharacteristic actionCharacteristic(deviceServiceCharacteristicUuid, BLERead | BLEWrite);

BLEService batteryService("180F");
BLEUnsignedIntCharacteristic batteryCharacteristic("2A19", BLERead | BLENotify);
int batteryLevel = 100;
long previousMillis = 0;

int PinActuator = 8; 

void setup() {
  pinMode(PinActuator, OUTPUT);
  digitalWrite(PinActuator, HIGH); // High = push-pin in on actuator

  
  if (!BLE.begin()) { 
    while (1); //TODO handle cases when BLE is not responding
  }

  BLE.setLocalName(" Worker(Peripheral) ");

  BLE.setAdvertisedService(batteryService);
  batteryService.addCharacteristic(batteryCharacteristic);
  BLE.addService(batteryService);
  batteryCharacteristic.writeValue(batteryLevel);

  BLE.setAdvertisedService(actionService);
  actionService.addCharacteristic(actionCharacteristic);
  BLE.addService(actionService);
  actionCharacteristic.writeValue(-1);
  BLE.advertise();
}

void loop() {
  
  BLEDevice central = BLE.central();
  delay(500);

  if (central) {  
    while (central.connected()) {
      if (actionCharacteristic.written()) {
        action = actionCharacteristic.value();
        pressAction(action);
      }
      long currentMillis = millis();
      if (batteryLevel >= 1 && currentMillis - previousMillis >= 5000) {
        previousMillis = currentMillis;
        batteryLevel--; //TODO read level of battery of actual battery 
        batteryCharacteristic.writeValue(batteryLevel);        
      }
      
    }
    batteryLevel = 100; //TODO replace with real batterylevel
  }
  
}

void pressAction(bool action) {
  digitalWrite(PinActuator, LOW); //LOW = push-pin out on actuator
  delay(2000);
  digitalWrite(PinActuator, HIGH); // HIGH = push-pin in on actuator

  actionCharacteristic.writeValue(0); // Reset action value
}