import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';

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
}
