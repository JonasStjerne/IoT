import { IsNotEmpty, Max, Min } from 'class-validator';
import { Action } from 'src/action/entities/action.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Hub } from '../../hub/entities/hub.entity';

export enum WorkerAction {
  PRESS = 'press',
}

export enum WorkerStatus {
  IDLE = 'idle',
  BUSY = 'busy',
  ERROR = 'error',
}

export enum WorkerState {
  OFFLINE = 'offline',
  ONLINE = 'online',
}

@Entity()
export class Worker {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: WorkerAction,
    default: WorkerAction.PRESS,
  })
  action: WorkerAction;

  @Column({
    type: 'enum',
    enum: WorkerStatus,
    default: WorkerStatus.IDLE,
  })
  status: WorkerStatus;

  @Column({
    type: 'enum',
    enum: WorkerState,
    default: WorkerState.OFFLINE,
  })
  state: WorkerState;

  @Column()
  @Min(0)
  @Max(100)
  batteryLevel: number;

  @ManyToOne(() => Hub, (hub) => hub.workers)
  hub: Hub;

  @OneToMany(() => Action, (action) => action.worker, {
    eager: true,
    onDelete: 'CASCADE',
  })
  actions: Action[];
}
