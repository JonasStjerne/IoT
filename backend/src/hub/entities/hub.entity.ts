import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  name: string | null;

  @Column({ nullable: true })
  socketId: string | null;

  @Column({
    type: 'enum',
    enum: HubState,
    default: HubState.OFFLINE,
  })
  state: HubState;

  @ManyToMany(() => User, (user) => user.hubs)
  users: User[];

  @OneToMany(() => Worker, (worker) => worker.hub, {
    eager: true,
    onDelete: 'CASCADE',
  })
  workers: Worker[];

}
