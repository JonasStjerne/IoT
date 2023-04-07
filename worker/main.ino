/*
  BLE_Peripheral.ino

  This program uses the ArduinoBLE library to set-up an Arduino Nano 33 BLE 
  as a peripheral device and specifies a service and a characteristic. Depending 
  of the value of the specified characteristic, an on-board LED gets on. 

  The circuit:
  - Arduino Nano 33 BLE. 

  This example code is in the public domain.
*/

#include <ArduinoBLE.h>
 
// enum {
// 17	  BATTERY_DEATH = 0,
// 18	  BATTERY_LOW = 1,
// 19	  BATTERY_OKAY  = 2,
// 20	  BATTERY_HIGH  = 3,
// 21	  BATTERY_FULL = 4
// 22	};

const char* deviceServiceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";
const char* deviceServiceCharacteristicUuid = "19b10001-e8f2-537e-4f6c-d104768a1214";

int action = -1;

BLEService actionService(deviceServiceUuid); 
BLEByteCharacteristic actionCharacteristic(deviceServiceCharacteristicUuid, BLERead | BLEWrite);

BLEService batteryService("180F");
BLEUnsignedIntCharacteristic batteryCharacteristic("2A19", BLERead | BLENotify);
int batteryLevel = 4;
long previousMillis = 0;



void setup() {
  Serial.begin(9600);
  while (!Serial);  
  
  pinMode(LEDR, OUTPUT);
  pinMode(LEDG, OUTPUT);
  pinMode(LEDB, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  
  digitalWrite(LEDR, HIGH);
  digitalWrite(LEDG, HIGH);
  digitalWrite(LEDB, HIGH);
  digitalWrite(LED_BUILTIN, LOW);

  
  if (!BLE.begin()) {
    Serial.println("- Starting Bluetooth® Low Energy module failed!");
    while (1);
  }

  BLE.setLocalName("Arduino Nano 33 BLE (Peripheral)");

  BLE.setAdvertisedService(batteryService);
  batteryService.addCharacteristic(batteryCharacteristic);
  BLE.addService(batteryService);
  batteryCharacteristic.writeValue(batteryLevel);

  BLE.setAdvertisedService(actionService);
  actionService.addCharacteristic(actionCharacteristic);
  BLE.addService(actionService);
  actionCharacteristic.writeValue(-1);
  BLE.advertise();

  Serial.println("Nano 33 BLE (Peripheral Device)");
  Serial.println(" ");


}

void loop() {
  BLEDevice central = BLE.central();
  Serial.println("- Discovering central device...");
  Serial.println(deviceServiceUuid);
  delay(500);

  if (central) {
    Serial.println("* Connected to central device!");
    Serial.print("* Device MAC address: ");
    Serial.println(central.address());
    Serial.println(" ");

    while (central.connected()) {
      int deltaTime = 0;
      if (actionCharacteristic.written()) {
        action = actionCharacteristic.value();
        pressAction(action);
      }
      long currentMillis = millis();
      if (batteryLevel >= 1 && currentMillis - previousMillis >= 5000) {
        previousMillis = currentMillis;
        batteryLevel--;
        batteryCharacteristic.writeValue(batteryLevel);
        Serial.println("Battery level lowered to");
        Serial.println(batteryLevel);
        
      }
      
    }
    batteryLevel = 5;
    Serial.println("* Disconnected to central device!");
  }
  
}

void pressAction(bool action) {
  Serial.println("- Characteristic <action_type> has changed!");
  Serial.println(action);
   digitalWrite(LEDR, LOW);
   delay(2000);
   digitalWrite(LEDR, HIGH);
  
  actionCharacteristic.writeValue(0);
}