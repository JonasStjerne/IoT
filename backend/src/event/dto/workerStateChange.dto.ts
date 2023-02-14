import { Worker } from '../../worker/entities/worker.entity';
export class WorkerStateChangeDto {
  workerId: Worker['id'];
  state: Worker['state'];
}
