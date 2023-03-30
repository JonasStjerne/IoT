import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { HubModule } from 'src/hub/hub.module';
import { ActionSubscriber } from './action.subscriber';
import { WorkerModule } from 'src/worker/worker.module';

@Module({
  imports: [AuthModule, HubModule, WorkerModule],
  providers: [EventGateway, EventService, ActionSubscriber],
})
export class EventModule {}
