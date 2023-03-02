import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/_decorators/auth.decorator';
import { AuthUser } from 'src/auth/_decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Hub } from 'src/hub/entities/hub.entity';
import { Worker } from './entities/worker.entity';


@ApiTags('Worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find worker with id' })
  @Auth()
  async findOne(
    @AuthUser('id') userId: User['id'],
    @Param('id') id: string
    ) {
    const worker = await this.workerService.findOne(userId, id);
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
    @Body() updateWorkerDto: UpdateWorkerDto) {
    const workerUpdate = await this.workerService.update(userId, hubId, workerId, updateWorkerDto);
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
