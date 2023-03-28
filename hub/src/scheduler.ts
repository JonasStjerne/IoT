import schedule = require("node-schedule");
import { IWorkerDto } from "./models/worker.dto";
import { IActionDto, ActionRepeat } from "./models/action.dto";
import bluetoothService from "./bluetooth";

function scheduleAction(workerId: IWorkerDto["id"], action: IActionDto, BluetoothService: bluetoothService) {
  switch (action.repeat) {
    case ActionRepeat.ONCE:
      schedule.scheduleJob(action.executeDateTime, () => BluetoothService.sendAction(workerId));
      break;
    case ActionRepeat.DAILY:
      schedule.scheduleJob(
        { hour: action.executeDateTime.getHours(), minute: action.executeDateTime.getMinutes() },
        () => BluetoothService.sendAction(workerId)
      );
      break;
    case ActionRepeat.WEEKLY:
      schedule.scheduleJob(
        {
          hour: action.executeDateTime.getHours(),
          minute: action.executeDateTime.getMinutes(),
          dayOfWeek: action.executeDateTime.getDate(),
        },
        () => BluetoothService.sendAction(workerId)
      );
      break;
    case ActionRepeat.YEARLY:
      schedule.scheduleJob(
        {
          hour: action.executeDateTime.getHours(),
          minute: action.executeDateTime.getMinutes(),
          dayOfWeek: action.executeDateTime.getDate(),
          year: action.executeDateTime.getFullYear(),
        },
        () => BluetoothService.sendAction(workerId)
      );
      break;
  }
}

export default class scheduler {
  private bluetoothService: bluetoothService;
  constructor(BluetoothService: bluetoothService) {
    this.bluetoothService = BluetoothService;
  }
  scheduleActions(workerData: IWorkerDto[]) {
    workerData.forEach((worker) => {
      worker.actions.forEach((action) => {
        console.log("Scheduling ", action);
        scheduleAction(worker.id, action, this.bluetoothService);
      });
    });
  }
}
