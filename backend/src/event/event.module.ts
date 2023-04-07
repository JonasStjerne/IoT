import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HubModule } from '../hub/hub.module';
import { WorkerModule } from '../worker/worker.module';
import { ActionSubscriber } from './action.subscriber';
import { EventGateway } from './event.gateway';
import { EventService } from './event.service';

@Module({
  imports: [AuthModule, HubModule, WorkerModule],
  providers: [EventGateway, EventService, ActionSubscriber],
  exports: [EventService],
})
export class EventModule {}
