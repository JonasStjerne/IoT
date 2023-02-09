import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: User['username'],
    password: User['password'],
  ): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (user && passwordIsMatch) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;
}
