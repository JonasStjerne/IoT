import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/_decorators/auth.decorator';
import { AuthUser } from '../auth/_decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action } from './entities/action.entity';

@ApiTags('Action')
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Create new action for worker' })
  create(
    @AuthUser() user: User,
    @Query('workerId') workerId: string,
    @Body() createActionDto: CreateActionDto,
  ) {
    return this.actionService.create(user, workerId, createActionDto);
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Return all actions connected to a worker' })
  async findAll(@AuthUser() user: User, @Query('workerId') id: string) {
    let actions: Action[] | null = null;
    user.hubs.forEach((hub) => {
      const workerDb = hub.workers.find((worker) => worker.id == id);
      if (workerDb) {
        actions = workerDb.actions;
      }
    });

    if (!actions) {
      throw new UnauthorizedException(
        "You are not authorized to access this worker's actions",
      );
    }

    return actions;
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Find an action' })
  findOneBy(@AuthUser() user: User, @Param('id') actionId: string) {
    const action = this.actionService.findActionOfUser(user, actionId);
    if (!action) {
      throw new UnauthorizedException(
        'You are not authorized to access this action',
      );
    }
    return action;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update action' })
  @Auth()
  async update(
    @AuthUser() user: User,
    @Param('id') actionId: string,
    @Body() updateActionDto: UpdateActionDto,
  ) {
    return await this.actionService.update(user, actionId, updateActionDto);
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Delete an action' })
  async remove(@AuthUser() user: User, @Param('id') actionId: string) {
    return await this.actionService.remove(user, actionId);
  }

  @Post('instant-action')
  @Auth()
  @ApiOperation({ summary: 'Send a instant action to a worker' })
  async sendInstantAction(
    @AuthUser('id') userId: User['id'],
    @Query('workerId') workerId: string,
  ) {
    await this.actionService.sendInstantAction(userId, workerId);
    return;
  }
}
