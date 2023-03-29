import schedule = require("node-schedule");
import { IWorkerDto } from "./models/worker.dto";
import { IActionDto, ActionRepeat } from "./models/action.dto";
import bluetoothService from "./bluetooth";

export default class scheduler {
  private callback;
  constructor(callback: (workerId: IWorkerDto["id"]) => Promise<void> | undefined) {
    this.callback = callback;
  }
  scheduleActions(workerData: IWorkerDto[]) {
    workerData.forEach((worker) => {
      worker.actions.forEach((action) => {
        console.log("Scheduling ", action);
        this.scheduleAction(worker.id, action);
      });
    });
  }

  scheduleAction(workerId: IWorkerDto["id"], action: IActionDto) {
    switch (action.repeat) {
      case ActionRepeat.ONCE:
        schedule.scheduleJob(action.executeDateTime, () => this.callback(workerId));
        break;
      case ActionRepeat.DAILY:
        schedule.scheduleJob(
          { hour: action.executeDateTime.getHours(), minute: action.executeDateTime.getMinutes() },
          () => this.callback(workerId)
        );
        break;
      case ActionRepeat.WEEKLY:
        schedule.scheduleJob(
          {
            hour: action.executeDateTime.getHours(),
            minute: action.executeDateTime.getMinutes(),
            dayOfWeek: action.executeDateTime.getDate(),
          },
          () => this.callback(workerId)
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
          () => this.callback(workerId)
        );
        break;
    }
  }
}
