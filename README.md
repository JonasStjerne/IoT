# IoT - Make Non-Smart Objects Smart

A full-stack application that allows you to make your non-smart appliances smart by placing a small battery-powered Arduino on them. The Arduino will be able to do button presses to start/stop the appliances like a washing- or coffee machine. The Arduino connects via Low Energy Bluetooth to a Raspberry Pi that handles scheduling presses and communicates with a back end over a WebSocket connection, allowing you to remote control your appliances.
The Arduino's press can be scheduled to be a one-time action or repeat at intervals. This way, you can make non-smart appliances smart without having to replace them with a new smart version.

The application consists of the following architectural components which are containerized (except the Worker):

- Front end
- Back end
- Database
- Hub (Raspberry Pi)
- Worker (Arduino)

The front end consists of an Angular application. The front end supports user registration/log-in, registering hubs, and scheduling actions. Global interceptors catch HTTP errors and handle attaching access tokens.

The back end is built using NestJS and uses Swagger for documentation, providing endpoints to perform CRUD operations on hubs, workers, and actions. All endpoints are authenticated and authorized using JSON Web Token, and user passwords are hashed with bcrypt. The backend uses TypeORM as an ORM and validates and sanitizes incoming data.

The hub runs a Node.js server which connects to the back end over a WebSocket connection. The back end shares information about the workers connected to the hub and their scheduled actions. The hub connects to the workers (Arduinos) with Bluetooth Low Energy (BLE) and can schedule actions for the workers to execute.

The worker is an Arduino device that connects to the hub with BLE. It can press buttons when told to by the hub and share its battery level.
