import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  secret: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.hubs)
  users: User[];
}
