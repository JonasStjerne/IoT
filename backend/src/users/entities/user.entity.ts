import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';
import { Hub } from 'src/hub/entities/hub.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToMany(() => Hub, (hub) => hub.users, { cascade: true, eager: true })
  @JoinTable()
  hubs: Hub[];
}
