import { OmitType, PickType } from '@nestjs/swagger';
import { Worker } from '../entities/worker.entity';

export class CreateWorkerDto extends PickType(Worker, ['name'] as const) {}
