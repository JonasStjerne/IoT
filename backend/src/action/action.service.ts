import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventService } from '../event/event.service';
import { User } from '../users/entities/user.entity';
import { Worker } from '../worker/entities/worker.entity';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action } from './entities/action.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action) private actionRepository: Repository<Action>,
    @InjectRepository(Worker) private workerRepository: Repository<Worker>,
    private eventService: EventService,
  ) {}

  async create(
    userId: string,
    workerId: string,
    createActionDto: CreateActionDto,
  ) {
    const worker = await this.workerRepository.findOneByOrFail({
      id: workerId,
    });

    // TODO: check that worker belongs to user

    // Create new action
    const newAction = this.actionRepository.create(createActionDto);
    newAction.worker = worker;
    this.actionRepository.save(newAction);

    return newAction;
  }

  async findAll(workerId: Worker['id']) {
    const workerDb = await this.workerRepository.findOneBy({ id: workerId });
    console.log(workerDb);
    console.log(workerDb.actions);
    return workerDb.actions;
  }

  async findOneBy(actionId: string) {
    return await this.actionRepository.findOneByOrFail({ id: actionId });
  }

  async update(
    userId: string,
    actionId: string,
    updateActionDto: UpdateActionDto,
  ) {
    // Find
    const action = await this.actionRepository.findOneByOrFail({
      id: actionId,
    });

    // TODO: Check that action belongs to user
    /*
    const owner = action.worker.hub.users.find((user) => user.id == userId);
    if (! owner) {
        throw new NotFoundException('Action not found');
    }
    */
    return await this.actionRepository.save({
      id: action.id,
      isComplete: action.isComplete,
      worker: action.worker,
      ...updateActionDto,
    });
  }

  async remove(userId: string, actionId: string) {
    // TODO: check that action belongs to user

    // Find action with ID
    const action = await this.actionRepository.findOneByOrFail({
      id: actionId,
    });

    // Remove action from database
    const deleted = await this.actionRepository.remove(action);
    if (deleted) {
      return 'Action deleted successfully';
    } else {
      throw new NotFoundException('Something went wrong');
    }
  }

  async sendInstantAction(userId: User['id'], workerId: Worker['id']) {
    await this.eventService.instantActionToClient(userId, workerId);
    return;
  }
}
