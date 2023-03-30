import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { Worker } from '../../worker/entities/worker.entity';

export class WorkerConnectDto extends PickType(Worker, ['id']) {}
