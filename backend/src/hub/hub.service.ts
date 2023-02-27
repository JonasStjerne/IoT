import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateHubDto } from './dto/create-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { Hub } from './entities/hub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRequest, AuthUser } from 'src/auth/auth.model';
import { REQUEST } from '@nestjs/core';
import { ApiOkResponse } from '@nestjs/swagger';

@Injectable()
export class HubService {
  constructor(
    @InjectRepository(Hub) private hubsRepository: Repository<Hub>,
    @InjectRepository(User) private usersRepository: Repository<User>, // @Inject(REQUEST) private readonly request: AuthRequest,
  ) {}

  async register(userId: User['id'], hub: RegisterHubDto) {
    const hubDb = await this.validateHubCredentials(hub.id, hub.secret);
    const userDb = await this.usersRepository.findOne(userId);
    console.log(hubDb, userDb);
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

  async findAll(userId: User['id']) {
    const userDb = await this.usersRepository.findOne({ id: userId });
    return userDb.hubs;
  }

  async findOne(userId: User['id'], hubId: Hub['id']) {
    const userDb = await this.usersRepository.findOne({ id: userId });
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    if (hubDb) {
      return hubDb;
    }
    return null;
  }

  async update(
    userId: User['id'],
    hubId: Hub['id'],
    updateHubDto: UpdateHubDto,
  ) {
    const userDb = await this.usersRepository.findOneOrFail({ id: userId });
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    if (hubDb) {
      hubDb.name = updateHubDto.name;
      return await this.hubsRepository.save(hubDb);
    }
    return null;
  }

  async remove(userId: User['id'], hubId: Hub['id']) {
    const userDb = await this.usersRepository.findOneOrFail({ id: userId });
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    if (!hubDb) {
      throw new ForbiddenException(
        "You don't have access to this hub, or it doesn't exist",
      );
    }
    const deleted = await this.hubsRepository.delete(hubDb);
    if (deleted.affected > 0) {
      return 'Hub deleted successfully';
    } else {
      throw new NotFoundException('Something went wrong');
    }
  }

  async unRegister(userId: User['id'], hubId: Hub['id']) {
    const userDb = await this.usersRepository.findOneOrFail({ id: userId });
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    if (!hubDb) {
      throw new ForbiddenException(
        "You don't have access to this hub, or it doesn't exist",
      );
    }
    userDb.hubs = userDb.hubs.filter((hub) => hub.id != hubId);
    await this.usersRepository.save(userDb);
    return;
  }

  async getWorkersOfHub(hubId: string) {
    const hubDb = await this.hubsRepository.findOne({ id: hubId });
    return hubDb.workers;
  }
}
