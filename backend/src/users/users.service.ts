import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthRequest } from 'src/auth/auth.model';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(REQUEST) private readonly request: AuthRequest,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.JWT_SALT_ROUNDS),
    );
    createUserDto.password = hash;
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findOne(username: User['username']): Promise<User | undefined> {
    return this.usersRepository.findOne({ username });
  }

  async remove() {
    const user = await this.usersRepository.findOne({
      id: this.request.user.userId,
    });
    await this.usersRepository.delete(user);
    return;
  }
}
