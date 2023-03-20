import { IActionDto } from "./action.dto";

export enum WorkerAction {
  PRESS = "press",
}

export enum WorkerStatus {
  IDLE = "idle",
  BUSY = "busy",
  ERROR = "error",
}

export enum WorkerState {
  OFFLINE = "offline",
  ONLINE = "online",
}

export interface IWorkerDto {
  id: string;

  name: string;

  action: WorkerAction;

  status: WorkerStatus;

  state: WorkerState;

  actions: IActionDto[];
}
