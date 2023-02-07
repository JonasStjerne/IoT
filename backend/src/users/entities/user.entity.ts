import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Exclude()
  password: string;
}
