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
import { Hub, HubState } from './entities/hub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerService } from 'src/worker/worker.service';
import { BatteryLevelDto } from 'src/event/dto/batteryLevel.dto';
import { WorkerConnectDto } from '../event/dto/workerConnect.dto';
import { Worker } from 'src/worker/entities/worker.entity';

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

  async findAll(userId: User['id']) {
    const userDb = await this.usersRepository.findOneBy({ id: userId });
    return userDb.hubs;
  }

  async findOneBy(userId: User['id'], hubId: Hub['id']) {
    const userDb = await this.usersRepository.findOneBy({ id: userId });
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
    const userDb = await this.usersRepository.findOneByOrFail({ id: userId });
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    if (hubDb) {
      hubDb.name = updateHubDto.name;
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

  async getWorkersOfHub(hubId: string) {
    const hubDb = await this.hubsRepository.findOneBy({ id: hubId });
    return hubDb.workers;
  }

  async setWorkerOfHub(hubId: string, workerConnectDto: WorkerConnectDto) {
    let worker = await this.workerService.findOneById(workerConnectDto.id);
    if (!worker) {
      worker = await this.workerService.create(workerConnectDto);
    }
    const hubDb = await this.hubsRepository.findOneBy({ id: hubId });
    hubDb.workers.push(worker);
    await this.hubsRepository.save(hubDb);
    return worker;
  }

  async setState(hubId: Hub['id'], state: HubState) {
    const hubDb = await this.hubsRepository.findOneByOrFail({ id: hubId });
    hubDb.state = state;
    return await this.hubsRepository.save(hubDb);
  }

  async setSocketId(hubId: Hub['id'], socketId: string | null) {
    const hubDb = await this.hubsRepository.findOneByOrFail({ id: hubId });
    hubDb.socketId = socketId;
    return await this.hubsRepository.save(hubDb);
  }

  async getHubExtendedData(hubId: Hub['id']) {
    const result = await this.hubsRepository
      .createQueryBuilder('hub')
      .leftJoinAndSelect('hub.workers', 'workers')
      .where('hub.id = :id', { id: hubId })
      .getOne();
    return result;
  }

  async deleteRelationToWorker(
    hubId: Hub['id'],
    workerConnectDto: WorkerConnectDto,
  ) {
    const hubDb = await this.hubsRepository.findOneBy({ id: hubId });
    hubDb.workers = hubDb.workers.filter(
      (worker) => worker.id != workerConnectDto.id,
    );
    return await this.hubsRepository.save(hubDb);
  }

  async deleteRealtionToAllWorkers(hubId: Hub['id']) {
    const hubDb = await this.hubsRepository.findOneBy({ id: hubId });
    hubDb.workers = [];
    await this.hubsRepository.save(hubDb);
  }

  async updateWorkerBatteryLevel(
    hubId: Hub['id'],
    batteryLevelDto: BatteryLevelDto,
  ) {
    const hubDb = await this.hubsRepository.findOneBy({ id: hubId });
    hubDb.workers.forEach(async (worker) => {
      const workerBatteryLevelFromDto = batteryLevelDto[worker.id];
      if (workerBatteryLevelFromDto) {
        worker.batteryLevel = workerBatteryLevelFromDto;
      }
    });
    return await this.hubsRepository.save(hubDb);
  }

  async getHubByWorkerId(workerId: Worker['id']) {
    const result = await this.hubsRepository
      .createQueryBuilder('hub')
      .leftJoinAndSelect('hub.workers', 'workers')
      .where('workers.id = :id', { id: workerId })
      .getOne();
    return result;
  }
}
