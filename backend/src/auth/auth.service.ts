import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';
import { ApiProperty } from '@nestjs/swagger';
import { AuthUser, IJwtPayload, IAuthHub } from './auth.model';
import { Hub } from 'src/hub/entities/hub.entity';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Hub) private hubsRepository: Repository<Hub>,
  ) {}

  async validateUser(
    username: User['username'],
    password: User['password'],
  ): Promise<AuthUser | null> {
    const user = await this.usersService.findOneBy(username);
    if (!user) {
      return null;
    }
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (user && passwordIsMatch) {
      const { password, hubs, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: AuthUser): Promise<LoginResponse> {
    const payload = {
      sub: user.id,
      username: user.username,
      userType: user.userType,
    } as IJwtPayload;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateHub(id: Hub['id'], secret: Hub['secret']) {
    const hubDb = await this.hubsRepository.findOneBy({ id });
    if (hubDb && hubDb.secret == secret) {
      const { secret, workers, users, ...rest } = hubDb;
      return rest as IAuthHub;
    }
    return null;
  }
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;
}
