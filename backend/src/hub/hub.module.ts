import { Module } from '@nestjs/common';
import { HubService } from './hub.service';
import { HubController } from './hub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hub } from './entities/hub.entity';
import { User } from 'src/users/entities/user.entity';
import { WorkerModule } from 'src/worker/worker.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hub, User]), WorkerModule],
  controllers: [HubController],
  providers: [HubService],
  exports: [HubService],
})
export class HubModule {}
