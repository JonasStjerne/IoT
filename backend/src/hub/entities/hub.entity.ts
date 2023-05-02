import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  Generated,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Worker } from '../../worker/entities/worker.entity';

export enum HubState {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

@Entity()
export class Hub {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  @Generated('uuid')
  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  secret: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  socketId?: string;

  @Column({
    type: 'enum',
    enum: HubState,
    default: HubState.OFFLINE,
  })
  state: HubState;

  @ManyToMany(() => User, (user) => user.hubs)
  users: Promise<User[]>;

  @OneToMany(() => Worker, (worker) => worker.hub, {
    eager: true,
    cascade: true,
  })
  workers: Worker[];
}
