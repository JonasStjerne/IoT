import Action from "./action.dto";

enum WorkerAction {
  PRESS = "press",
}

enum WorkerStatus {
  IDLE = "idle",
  BUSY = "busy",
  ERROR = "error",
}

enum WorkerState {
  OFFLINE = "offline",
  ONLINE = "online",
}

export interface IWorkerDto {
  id: string;

  name: string;

  action: WorkerAction;

  status: WorkerStatus;

  state: WorkerState;

  actions: Action[];
}
