import { Worker } from 'src/worker/entities/worker.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hub } from 'src/hub/entities/hub.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
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
    console.log('findOne worker ' + userId + ", " + workerId);
    const userDb = await this.usersRepository.findOneOrFail({ id: userId });
    for (let hub of userDb.hubs) {
      console.log(JSON.stringify(hub, null, 4));
      hub.workers.forEach((w) => console.log(w + ", " + w.id));
      const worker = hub.workers.find((w) => w.id == workerId);
      if (worker) {
        console.log("Found worker!!!")
        console.log(JSON.stringify(worker, null, 4))
        return worker;
      }
    }
    return null;
  }

  async update(userId: string, hubId: string, workerId: string, updateWorkerDto: UpdateWorkerDto) {
    const userDb = await this.usersRepository.findOneOrFail({ id: userId });
    console.log(userDb);
    console.log('hubId: ' + hubId);
    const hubDb = userDb.hubs.find((hub) => hub.id == hubId);
    console.log(hubDb);

    console.log('workerId: ' + workerId);
    const workerDb = hubDb.workers.find((worker) => worker.id == workerId);
    if (workerDb) {
      workerDb.name = updateWorkerDto.name;
      return await this.workerRepository.save(workerDb);
    }
    // ikke så godt - user ejer ikke hub som worker er tilknyttet
    return null;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}

