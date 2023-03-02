import { Injectable, NotImplementedException } from '@nestjs/common';
import { Hub, HubState } from 'src/hub/entities/hub.entity';
import { HubService } from 'src/hub/hub.service';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EventService {
  constructor(
    private readonly hubService: HubService,
    private readonly authService: AuthService,
  ) {}

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

  async getHubData(hubId: string) {
    return await this.hubService.getHubExtendedData(hubId);
  }

  async isAuthenticatedHub(socket: Socket) {
    const basicToken = socket.handshake.headers.authorization
      .split(' ')[1]
      .split('.');
    const [id, secret] = basicToken;
    if (!id || !secret) {
      return null;
    }
    const hub = await this.authService.validateHub(id, secret);
    if (!hub) {
      return null;
    }
    return hub;
  }
}
