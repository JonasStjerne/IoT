import { PickType } from '@nestjs/mapped-types';
import { Worker } from 'src/worker/entities/worker.entity';

export class BatteryLevelDto {
  [workerUUID: string]: number;
}
