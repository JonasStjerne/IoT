import { PickType } from '@nestjs/swagger';
import { Worker } from '../entities/worker.entity';

export class UpdateWorkerDto extends PickType(Worker, ['name']) {}
