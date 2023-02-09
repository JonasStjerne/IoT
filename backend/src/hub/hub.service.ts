import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateHubDto } from './dto/create-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { Hub } from './entities/hub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from 'src/auth/auth.model';

@Injectable()
export class HubService {
  constructor(
    @InjectRepository(Hub) private hubsRepository: Repository<Hub>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async register(user: AuthUser, hub: RegisterHubDto) {
    const hubDb = await this.validateHubCredentials(hub.id, hub.secret);
    const userDb = await this.usersRepository.findOne(user.userId);
    if (hubDb && userDb) {
      userDb.hubs = [...userDb.hubs, hubDb];
      await this.usersRepository.save(userDb);
      return hubDb;
    }
    return new UnauthorizedException(
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

  findAll() {
    return `This action returns all hub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hub`;
  }

  update(id: number, updateHubDto: UpdateHubDto) {
    return `This action updates a #${id} hub`;
  }

  remove(id: number) {
    return `This action removes a #${id} hub`;
  }
}
