import { Type } from 'class-transformer';
import { Worker } from '../../worker/entities/worker.entity';

export class ConnectedWorkersDto {
  @Type(() => Worker)
  workers: Worker[];
}
