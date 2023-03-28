import schedule = require("node-schedule");
import { IWorkerDto } from "./models/worker.dto";
import { IActionDto, ActionRepeat } from "./models/action.dto";
import bluetoothService from "./bluetooth";

function scheduleAction(workerId: IWorkerDto["id"], action: IActionDto) {
  switch (action.repeat) {
    case ActionRepeat.ONCE:
      schedule.scheduleJob(action.executeDateTime, () => bluetoothService.sendAction(workerId));
      break;
    case ActionRepeat.DAILY:
      schedule.scheduleJob(
        { hour: action.executeDateTime.getHours(), minute: action.executeDateTime.getMinutes() },
        () => bluetoothService.sendAction(workerId)
      );
      break;
    case ActionRepeat.WEEKLY:
      schedule.scheduleJob(
        {
          hour: action.executeDateTime.getHours(),
          minute: action.executeDateTime.getMinutes(),
          dayOfWeek: action.executeDateTime.getDate(),
        },
        () => bluetoothService.sendAction(workerId)
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
        () => bluetoothService.sendAction(workerId)
      );
      break;
  }
}

export default class scheduler {
  scheduleActions(workerData: IWorkerDto[]) {
    workerData.forEach((worker) => {
      worker.actions.forEach((action) => {
        console.log("Scheduling ", action);
        scheduleAction(worker.id, action);
      });
    });
  }
}
