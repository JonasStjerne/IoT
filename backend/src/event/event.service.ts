import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { Hub, HubState } from 'src/hub/entities/hub.entity';
import { HubService } from 'src/hub/hub.service';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Action } from 'src/action/entities/action.entity';
import { WorkerService } from 'src/worker/worker.service';
import { User } from 'src/users/entities/user.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Injectable()
export class EventService {
  constructor(
    private readonly hubService: HubService,
    private readonly authService: AuthService,
    private readonly workerService: WorkerService,
  ) {}
  wsClients: Socket[] = [];

  async workerStateChange() {
    return 'this should update the worker state in the db';
  }

  async hubConnected(hubId: Hub['id'], socket: Socket) {
    await this.hubService.setSocketId(hubId, socket.id);
    await this.hubService.setState(hubId, HubState.ONLINE);
    this.wsClients.push(socket);
  }

  async hubDisconnected(hubId: Hub['id'], socket: Socket) {
    await Promise.all([
      this.hubService.setState(hubId, HubState.OFFLINE),
      this.hubService.setSocketId(hubId, null),
      this.hubService.deleteRealtionToAllWorkers(hubId),
    ]);
    this.wsClients = this.wsClients.filter((client) => client.id !== socket.id);
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

  async pushNewDataToClient(action: Action) {
    //Find the owning hub
    const ownerHub = await this.hubService.getHubByWorkerId(action.worker.id);
    //If no hub owns the worker, the worker should not be able to get altered by a user.
    //If this happens, it's a bug
    if (!ownerHub) {
      throw new InternalServerErrorException('Hub not found');
    }
    //Find the socket of the hub
    const client = this.wsClients.find(
      (client) => client.id === ownerHub.socketId,
    );
    //If no socket is found, the hub is not online
    if (!client) {
      return;
    }
    //Send the new data to the client. The client expects to get the whole worker object including actions
    const worker = ownerHub.workers.find((w) => w.id === action.worker.id);
    const workerExtended = await this.workerService.findOneById(worker.id);
    client.emit('workerData', workerExtended);
  }

  async instantActionToClient(userId: User['id'], workerId: Worker['id']) {
    //Make sure the user have relation to the hub that the worker is connected to and its online
    const hubDb = await this.hubService.getHubByWorkerId(workerId);
    if (!hubDb) {
      throw new BadRequestException('Worker not online');
    }
    const usersOfHub = await this.hubService.getUsersByHubId(hubDb.id);
    const user = usersOfHub.find((user) => user.id === userId);
    if (!user) {
      throw new UnauthorizedException("You don't have access to this worker");
    }

    //Find the socket of the hub
    const client = this.wsClients.find(
      (client) => client.id === hubDb.socketId,
    );
    //If no socket is found, the hub is not online
    if (!client) {
      throw new BadRequestException('Hub not online');
    }
    console.log('Sending instant action to client');
    client.emit('instantAction', workerId);
  }
}
