import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/_decorators/auth.decorator';
import { AuthUser } from '../auth/_decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { WorkerService } from './worker.service';

@ApiTags('Worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all worker connected to a hub' })
  async findAll(@Param('id') id: string) {
    return await this.workerService.findAll(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find worker with id' })
  @Auth()
  async findOneBy(@AuthUser('id') userId: User['id'], @Param('id') id: string) {
    const worker = await this.workerService.findOneBy(userId, id);
    if (worker) {
      return worker;
    }
    throw new ForbiddenException(
      "You don't have access to this worker or it doesn't exist",
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update worker' })
  @Auth()
  async Rename(
    @AuthUser('id') userId: User['id'],
    @Query('hubId') hubId: string,
    @Param('id') workerId: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ) {
    const workerUpdate = await this.workerService.update(
      userId,
      hubId,
      workerId,
      updateWorkerDto,
    );
    if (workerUpdate) {
      return workerUpdate;
    }
    throw new ForbiddenException(
      "You don't have access to this worker, or it doesn't exist",
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerService.remove(+id);
  }
}
