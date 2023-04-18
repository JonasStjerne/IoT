import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatteryLevelDto } from '../event/dto/batteryLevel.dto';
import { User } from '../users/entities/user.entity';
import { Worker } from '../worker/entities/worker.entity';
import { WorkerService } from '../worker/worker.service';
import { CreateHubDto } from './dto/create-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { RenameHubDto } from './dto/update-hub.dto';
import { Hub, HubState } from './entities/hub.entity';

@Injectable()
export class HubService {
  constructor(
    @InjectRepository(Hub) private hubsRepository: Repository<Hub>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private workerService: WorkerService,
  ) {}

  async register(userId: User['id'], hub: RegisterHubDto) {
    const hubDb = await this.validateHubCredentials(hub.id, hub.secret);
    const userDb = await this.usersRepository.findOneBy({ id: userId });
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
    const hub = await this.hubsRepository.findOneBy({ id });
    if (hub && hub.secret == secret) {
      return hub;
    }
    return null;
  }

  create(createHubDto: CreateHubDto) {
    const newHub = this.hubsRepository.create(createHubDto);
    return this.hubsRepository.save(newHub);
  }

  async findAll(user: User) {
    return user.hubs;
  }

  async findOneBy(user: User, hubId: Hub['id']) {
    const hubDb = user.hubs.find((hub) => hub.id == hubId);
    if (hubDb) {
      return hubDb;
    }
    return null;
  }

  async update(user: User, hubId: Hub['id'], renameHubDto: RenameHubDto) {
    const hubDb = user.hubs.find((hub) => hub.id == hubId);
    if (hubDb) {
      hubDb.name = renameHubDto.name;
      return await this.hubsRepository.save(hubDb);
    }
    return null;
  }

  async remove(hubId: Hub['id']) {
    const hubDb = await this.hubsRepository.findOneByOrFail({ id: hubId });
    const deleted = await this.hubsRepository.remove(hubDb);
    if (deleted) {
      return 'Hub deleted successfully';
    } else {
      throw new NotFoundException('Something went wrong');
    }
  }

  async unRegister(userId: User['id'], hubId: Hub['id']) {
    console.log('unregister called');
    const userDb = await this.usersRepository.findOneByOrFail({ id: userId });
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    if (!hubDb) {
      throw new ForbiddenException(
        "You don't have access to this hub, or it doesn't exist",
      );
    }
    userDb.hubs = userDb.hubs.filter((hub) => {
      return hub.id !== hubId;
    });
    await this.usersRepository.save(userDb);
    return;
  }

  async setWorkerOfHub(hub: Hub, workerId: Worker['id']) {
    let worker = await this.workerService.findOneById(workerId);
    if (!worker) {
      worker = await this.workerService.create({ id: workerId });
    }
    hub.workers.push(worker);
    await this.hubsRepository.save(hub);
    return worker;
  }

  async setState(hub: Hub, state: HubState) {
    hub.state = state;
    return await this.hubsRepository.save(hub);
  }

  async setSocketId(hub: Hub, socketId: string | null) {
    hub.socketId = socketId;
    return await this.hubsRepository.save(hub);
  }

  async getHubExtendedData(hubId: Hub['id']) {
    const result = await this.hubsRepository
      .createQueryBuilder('hub')
      .leftJoinAndSelect('hub.workers', 'workers')
      .where('hub.id = :id', { id: hubId })
      .getOne();
    return result;
  }

  async getUsersByHubId(hubId: Hub['id']) {
    const result = await this.hubsRepository.findOneByOrFail({ id: hubId });
    return result.users;
  }

  async deleteRelationToWorker(hub: Hub, workerConnectDto: string) {
    console.log('The id of the disconnected worker is ', workerConnectDto);
    hub.workers = hub.workers.filter((worker) => worker.id != workerConnectDto);
    return await this.hubsRepository.save(hub);
  }

  async deleteRealtionToAllWorkers(hub: Hub) {
    hub.workers = [];
    await this.hubsRepository.save(hub);
  }

  async updateWorkerBatteryLevel(hub: Hub, batteryLevelDto: BatteryLevelDto) {
    hub.workers.forEach(async (worker) => {
      const workerBatteryLevelFromDto = batteryLevelDto[worker.id];
      if (workerBatteryLevelFromDto) {
        worker.batteryLevel = workerBatteryLevelFromDto;
      }
    });
    return await this.hubsRepository.save(hub);
  }

  async getHubByWorkerId(workerId: Worker['id']) {
    const result = await this.hubsRepository
      .createQueryBuilder('hub')
      .innerJoinAndSelect('hub.workers', 'workers')
      .where('workers.id = :id', { id: workerId })
      .getOne();
    return result;
  }
}
