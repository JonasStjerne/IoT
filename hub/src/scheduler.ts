import schedule = require("node-schedule");
import { IWorkerDto } from "./models/worker.dto";
import { IActionDto, ActionRepeat } from "./models/action.dto";

export default class scheduler {
  private callback;
  private schedulContainer: { [workerId: IWorkerDto["id"]]: schedule.Job[] } = {};

  constructor(callback: (workerId: IWorkerDto["id"]) => Promise<void> | undefined) {
    this.callback = callback;
  }
  scheduleActions(workerDto: IWorkerDto) {
    this.cancelWorkerJobs(workerDto.id);
    workerDto.actions.forEach((action) => {
      console.log("Scheduling ", action);
      this.scheduleAction(workerDto.id, action);
    });
  }

  cancelWorkerJobs(workerId: IWorkerDto["id"]) {
    //Retrieve schedueled jobs
    const workerSchedule = this.schedulContainer[workerId];
    //If the worker does, cancel the schedueld actions before scheduling the new ones
    if (workerSchedule) {
      workerSchedule.forEach((job) => {
        job.cancel;
      });
      delete this.schedulContainer[workerId];
    }
  }

  private scheduleAction(workerId: IWorkerDto["id"], action: IActionDto) {
    let job: schedule.Job;
    switch (action.repeat) {
      case ActionRepeat.ONCE:
        job = schedule.scheduleJob(action.executeDateTime, () => this.callback(workerId));
        break;
      case ActionRepeat.DAILY:
        schedule.scheduleJob(
          { hour: action.executeDateTime.getHours(), minute: action.executeDateTime.getMinutes() },
          () => this.callback(workerId)
        );
        job = schedule.scheduleJob(action.executeDateTime, () => this.callback(workerId));
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
        job = schedule.scheduleJob(action.executeDateTime, () => this.callback(workerId));
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
        job = schedule.scheduleJob(action.executeDateTime, () => this.callback(workerId));
        break;
    }
    const workerSchedule = this.schedulContainer[workerId];
    if (workerSchedule) {
      this.schedulContainer[workerId] = [...this.schedulContainer[workerId], job!];
    } else {
      this.schedulContainer[workerId] = [job!];
    }
  }
}
