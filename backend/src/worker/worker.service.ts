import { Worker } from 'src/worker/entities/worker.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hub } from 'src/hub/entities/hub.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HubService } from 'src/hub/hub.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Hub) private hubsRepository: Repository<Hub>,
    @InjectRepository(Worker) private workerRepository: Repository<Worker>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const newWorker = this.workerRepository.create(createWorkerDto);
    return await this.workerRepository.save(newWorker);
  }

  async findAll(hubId: Hub['id']) {
    const hubDb = await this.hubsRepository.findOneBy({ id: hubId });
    return hubDb.workers;
  }

  async findOneBy(userId: string, workerId: string) {
    const userDb = await this.usersRepository.findOneByOrFail({ id: userId });
    for (let hub of userDb.hubs) {
      const worker = hub.workers.find((w) => w.id == workerId);
      if (worker) {
        return worker;
      }
    }
    return null;
  }

  async findOneById(workerId: string) {
    return await this.workerRepository.findOneBy({ id: workerId });
  }

  async update(
    userId: string,
    hubId: string,
    workerId: string,
    updateWorkerDto: UpdateWorkerDto,
  ) {
    const userDb = await this.usersRepository.findOneByOrFail({ id: userId });
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    const workerDb = hubDb?.workers.find((worker) => worker.id == workerId);
    if (workerDb) {
      workerDb.name = updateWorkerDto.name;
      return await this.workerRepository.save(workerDb);
    }
    return null;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
