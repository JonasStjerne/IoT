import { Exclude } from 'class-transformer';
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

@Entity()
export class Hub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  @Exclude()
  secret: string;

  @Column({ nullable: true })
  name: string | null;

  @Column({ nullable: true })
  socketId: string | null;

  @ManyToMany(() => User, (user) => user.hubs)
  users: User[];

  @OneToMany(() => Worker, (worker) => worker.hub)
  workers: Worker[];
}
