import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Action } from './entities/action.entity';
import { Worker } from '../worker/entities/worker.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Action, Worker, User]), EventModule],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
