import { ForbiddenException, Inject, Injectable, Scope } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateHubDto } from './dto/create-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { Hub } from './entities/hub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRequest, AuthUser } from 'src/auth/auth.model';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class HubService {
  constructor(
    @InjectRepository(Hub) private hubsRepository: Repository<Hub>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(REQUEST) private readonly request: AuthRequest,
  ) {}

  async register(user: AuthUser, hub: RegisterHubDto) {
    const hubDb = await this.validateHubCredentials(hub.id, hub.secret);
    const userDb = await this.usersRepository.findOne(user.userId);
    if (hubDb && userDb) {
      userDb.hubs = [...userDb.hubs, hubDb];
      await this.usersRepository.save(userDb);
      return hubDb;
    }
    throw new ForbiddenException(
      'Hub credientials not valid, please try again',
    );
  }

  async validateHubCredentials(id: string, secret: string) {
    const hub = await this.hubsRepository.findOne(id);
    if (hub && hub.secret == secret) {
      return hub;
    }
    return null;
  }

  create(createHubDto: CreateHubDto) {
    const newHub = this.hubsRepository.create(createHubDto);
    return this.hubsRepository.save(newHub);
  }

  async findAll(user: AuthUser) {
    const userDb = await this.usersRepository.findOne(user.userId);
    return userDb.hubs;
  }

  async findOne(id: string) {
    const userDb = await this.usersRepository.findOne(this.request.user.userId);
    const hubDb = userDb.hubs.find((hub) => hub.id == id);
    if (hubDb) {
      return hubDb;
    }
    throw new ForbiddenException("You don't have access to this hub");
  }

  async update(id: Hub['id'], updateHubDto: UpdateHubDto) {
    const userDb = await this.usersRepository.findOne(this.request.user.userId);
    const hubDb = userDb.hubs.find((hub) => hub.id == id);
    if (hubDb) {
      hubDb.name = updateHubDto.name;
      return this.hubsRepository.save(hubDb);
    }
    throw new ForbiddenException("You don't have access to this hub");
  }

  remove(id: number) {
    return `This action removes a #${id} hub`;
  }

  async unRegister(id: string) {
    const userDb = await this.usersRepository.findOne(this.request.user.userId);
    const hubDb = userDb.hubs.find((hub) => hub.id == id);
    if (!hubDb) {
      throw new ForbiddenException(
        "You don't have access to this hub, or it doesn't exist",
      );
    }
    userDb.hubs = userDb.hubs.filter((hub) => hub.id != id);
    await this.usersRepository.save(userDb);
    return;
  }
}
