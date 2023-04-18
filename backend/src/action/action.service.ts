import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async create(user: User, workerId: string, createActionDto: CreateActionDto) {
    const hubDb = user.hubs.find((hub) =>
      hub.workers.find((worker) => worker.id == workerId),
    );
    if (!hubDb) {
      throw new UnauthorizedException(
        'You are not authorized to create actions for this worker',
      );
    }

    // Create new action
    const newAction = this.actionRepository.create(createActionDto);
    newAction.worker = Promise.resolve(hubDb.workers[workerId]);
    this.actionRepository.save(newAction);

    return newAction;
  }

  async findOneBy(actionId: string) {
    return await this.actionRepository.findOneByOrFail({ id: actionId });
  }

  async update(user: User, actionId: string, updateActionDto: UpdateActionDto) {
    const action = this.findActionOfUser(user, actionId);
    if (!action) {
      throw new UnauthorizedException('Action not found or not authorized');
    }

    return await this.actionRepository.save({
      id: action.id,
      isComplete: action.isComplete,
      worker: action.worker,
      ...updateActionDto,
    });
  }

  async remove(user: User, actionId: string) {
    const action = this.findActionOfUser(user, actionId);
    if (!action) {
      throw new UnauthorizedException('Action not found or not authorized');
    }
    // Remove action from database
    const deleted = await this.actionRepository.remove(action);
    if (deleted) {
      return deleted;
    } else {
      throw new NotFoundException('Something went wrong');
    }
  }

  async sendInstantAction(userId: User['id'], workerId: Worker['id']) {
    await this.eventService.instantActionToClient(userId, workerId);
    return;
  }

  findActionOfUser(user: User, actionId: string) {
    for (const hub of user.hubs) {
      for (const worker of hub.workers) {
        for (const action of worker.actions) {
          if (action.id == actionId) {
            return action;
          }
        }
      }
    }
    return null;
  }
}
