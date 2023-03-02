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
    @InjectRepository(Worker) private workerRepository: Repository<Worker>,
  ) {}


  create(createWorkerDto: CreateWorkerDto) {
    return 'This action adds a new worker';
  }

  findAll() {
    return `This action returns all worker`;
  }

  async findOne(userId: string, workerId: string) {
    const userDb = await this.usersRepository.findOneOrFail({ id: userId });
    for (let hub of userDb.hubs) {
      const worker = hub.workers.find((w) => w.id == workerId);
      if (worker) {
        return worker;
      }
    }
    return null;
  }

  async update(userId: string, hubId: string, workerId: string, updateWorkerDto: UpdateWorkerDto) {
    const userDb = await this.usersRepository.findOneOrFail({ id: userId });
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    const workerDb = hubDb.workers.find((worker) => worker.id == workerId);
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

