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

export enum UserType {
  Admin = 1,
  User = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  @IsNumberString()
  id: string;

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

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType;

  @ManyToMany(() => Hub, (hub) => hub.users, { eager: true })
  @JoinTable()
  hubs: Hub[];
}
