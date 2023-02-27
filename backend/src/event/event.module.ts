import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { HubModule } from 'src/hub/hub.module';

@Module({
  imports: [AuthModule, HubModule],
  providers: [EventGateway, EventService],
})
export class EventModule {}
