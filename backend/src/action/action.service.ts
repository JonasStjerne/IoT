import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action } from './entities/action.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action) private actionRepository: Repository<Action>,
    @InjectRepository(Worker) private workerRepository: Repository<Worker>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async create(userId: string, workerId: string, createActionDto: CreateActionDto) {
    const worker = await this.workerRepository.findOne(workerId);

    // TODO: check that worker belongs to user

    // Create new action
    const newAction = this.actionRepository.create(createActionDto);
    newAction.worker = worker;
    this.actionRepository.save(newAction);
    console.log(newAction);

    return newAction;
  }

  findAll() {
    return `This action returns all action`;
  }

  async findOne(actionId: string) {
    return await this.actionRepository.findOne({id: actionId})
  }

  async update(userId: string, actionId: string, updateActionDto: UpdateActionDto) {

    // Find 
    const action = await this.actionRepository.findOneOrFail({ id: actionId});

    // TODO: Check that action belongs to user
    /*
    const owner = action.worker.hub.users.find((user) => user.id == userId);
    if (! owner) {
        throw new NotFoundException('Action not found');
    }
    */

    if (action) {
      if (updateActionDto.repeat) {
        action.repeat = updateActionDto.repeat;
      }
      if (updateActionDto.executeDateTime) {
        action.executeDateTime = updateActionDto.executeDateTime;
      }
      if (updateActionDto.durationSeconds) {
        action.durationSeconds = updateActionDto.durationSeconds;
      }
      return await this.actionRepository.save(action);
    }
    return null;

  }

  async remove(userId: string, actionId: string) {
    // TODO: check that action belongs to user

    // Find action with ID
    const action = await this.actionRepository.findOneOrFail({id: actionId});

    // Remove action from database
    const deleted = await this.actionRepository.remove(action);
    if (deleted) {
      return 'Action deleted successfully';
    } else {
      throw new NotFoundException('Something went wrong');
    }
  }
}
