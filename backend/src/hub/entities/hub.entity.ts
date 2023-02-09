import { Exclude } from 'class-transformer';
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
  @Exclude()
  secret: string;

  @Column({ nullable: true })
  name: string | null;

  @ManyToMany(() => User, (user) => user.hubs)
  users: User[];
}
