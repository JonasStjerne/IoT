import schedule = require("node-schedule");
import { ActionRepeat, IActionDto } from "./models/action.dto";
import { IWorkerDto } from "./models/worker.dto";

export default class scheduler {
  private callback;
  private schedulContainer: { [workerId: IWorkerDto["id"]]: schedule.Job[] } =
    {};

  constructor(
    callback: (workerId: IWorkerDto["id"]) => Promise<void> | undefined
  ) {
    this.callback = callback;
  }
  scheduleActions(workerDto: IWorkerDto) {
    this.cancelWorkerJobs(workerDto.id);
    workerDto.actions.forEach((action) => {
      this.scheduleAction(workerDto.id, action);
    });
  }

  cancelWorkerJobs(workerId: IWorkerDto["id"]) {
    //Retrieve schedueled jobs
    const workerSchedule = this.schedulContainer[workerId];
    //If the worker does, cancel the schedueld actions before scheduling the new ones
    if (workerSchedule) {
      workerSchedule.forEach((job) => {
        job.cancel();
      });
      delete this.schedulContainer[workerId];
    }
  }

  private scheduleAction(workerId: IWorkerDto["id"], action: IActionDto) {
    let job: schedule.Job;
    switch (action.repeat) {
      case ActionRepeat.ONCE:
        //If event in the past dont schedule
        if (new Date(action.executeDateTime) < new Date()) {
          console.error("Action in the past, not scheduling");
          return;
        }
        job = schedule.scheduleJob(
          { ...action.executeDateTime, tz: "Europe/Copenhagen" },
          () => this.callback(workerId)
        );
        break;
      case ActionRepeat.DAILY:
        job = schedule.scheduleJob(
          {
            hour: action.executeDateTime.getHours(),
            minute: action.executeDateTime.getMinutes(),
            tz: "Europe/Copenhagen",
          },
          () => this.callback(workerId)
        );
        break;
      case ActionRepeat.WEEKLY:
        job = schedule.scheduleJob(
          {
            hour: action.executeDateTime.getHours(),
            minute: action.executeDateTime.getMinutes(),
            dayOfWeek: action.executeDateTime.getDate(),
            tz: "Europe/Copenhagen",
          },
          () => this.callback(workerId)
        );
        break;
      case ActionRepeat.YEARLY:
        job = schedule.scheduleJob(
          {
            hour: action.executeDateTime.getHours(),
            minute: action.executeDateTime.getMinutes(),
            dayOfWeek: action.executeDateTime.getDate(),
            year: action.executeDateTime.getFullYear(),
            tz: "Europe/Copenhagen",
          },
          () => this.callback(workerId)
        );
        break;
    }
    console.log("Scheduled action for time: ", job!.nextInvocation());
    const workerSchedule = this.schedulContainer[workerId];
    if (workerSchedule) {
      this.schedulContainer[workerId] = [
        ...this.schedulContainer[workerId],
        job!,
      ];
    } else {
      this.schedulContainer[workerId] = [job!];
    }
  }
}
