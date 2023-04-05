import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { WorkerModule } from '../worker/worker.module';
import { Hub } from './entities/hub.entity';
import { HubController } from './hub.controller';
import { HubService } from './hub.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hub, User]), WorkerModule],
  controllers: [HubController],
  providers: [HubService],
  exports: [HubService],
})
export class HubModule {}
