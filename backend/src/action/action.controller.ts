import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Auth } from 'src/auth/_decorators/auth.decorator';
import { AuthUser } from 'src/auth/_decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { Action } from './entities/action.entity';

@ApiTags('Action')
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Create new action for worker' })
  create(
    @AuthUser('id') userId: User['id'],
    @Query('workerId') workerId: string,
    @Body() createActionDto: CreateActionDto,
  ) {
    return this.actionService.create(userId, workerId, createActionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all actions connected to a worker' })
  async findAll(@Param('id') id: string) {
    return await this.actionService.findAll(id);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Find an action' })
  findOneBy(@Param('id') actionId: string) {
    return this.actionService.findOneBy(actionId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update action' })
  @Auth()
  async update(
    @AuthUser('id') userId: User['id'],
    @Param('id') actionId: string,
    @Body() updateActionDto: UpdateActionDto,
  ) {
    return await this.actionService.update(userId, actionId, updateActionDto);
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Delete an action' })
  async remove(
    @AuthUser('id') userId: User['id'],
    @Param('id') actionId: string,
  ) {
    return await this.actionService.remove(userId, actionId);
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
