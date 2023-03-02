import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Action } from './entities/action.entity';
import { Worker } from '../worker/entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Action, Worker, User])],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule {}
