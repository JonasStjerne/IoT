import { Injectable, NotImplementedException } from '@nestjs/common';
import { Hub, HubState } from 'src/hub/entities/hub.entity';
import { HubService } from 'src/hub/hub.service';

@Injectable()
export class EventService {
  constructor(private readonly hubService: HubService) {}

  async workerStateChange() {
    return 'this should update the worker state in the db';
  }

  async hubConnected(hubId: Hub['id'], socketId: string) {
    throw new NotImplementedException();
  }

  async hubDisconnected(hubId: Hub['id']) {
    this.hubService.setState(hubId, HubState.OFFLINE);
    this.hubService.setSocketId(hubId, null);
  }
}
