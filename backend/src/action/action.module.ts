import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { User } from '../users/entities/user.entity';
import { Worker } from '../worker/entities/worker.entity';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { Action } from './entities/action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Action, Worker, User]), EventModule],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule {}
