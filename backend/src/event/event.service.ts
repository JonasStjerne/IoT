import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Action } from '../action/entities/action.entity';
import { AuthService } from '../auth/auth.service';
import { Hub, HubState } from '../hub/entities/hub.entity';
import { HubService } from '../hub/hub.service';
import { User } from '../users/entities/user.entity';
import { Worker } from '../worker/entities/worker.entity';
import { WorkerService } from '../worker/worker.service';

@Injectable()
export class EventService {
  constructor(
    private readonly hubService: HubService,
    private readonly authService: AuthService,
    private readonly workerService: WorkerService,
    @InjectRepository(Action) private actionRepository: Repository<Action>,
  ) {}

  wsClients: Map<string, Socket> = new Map();

  async workerStateChange() {
    return 'this should update the worker state in the db';
  }

  async hubConnected(hub: Hub, socket: Socket) {
    await Promise.all([
      this.hubService.setSocketId(hub, socket.id),
      this.hubService.setState(hub, HubState.ONLINE),
    ]);
    this.wsClients.set(socket.id, socket);
  }

  async hubDisconnected(hub: Hub, socket: Socket) {
    await Promise.all([
      this.hubService.setState(hub, HubState.OFFLINE),
      this.hubService.setSocketId(hub, undefined),
      this.hubService.deleteRealtionToAllWorkers(hub),
    ]);
    this.wsClients.delete(socket.id);
  }

  async getHubData(hubId: string) {
    return await this.hubService.getHubExtendedData(hubId);
  }

  async isAuthenticatedHub(socket: Socket) {
    const basicToken = socket.handshake.headers.authorization
      ?.split(' ')[1]
      ?.split('.');
    const [id, secret] = basicToken ?? [null, null];
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
    const workerDb = await action.worker;
    // const actionDb = await this.actionRepository.findOneBy({ id: action.id });
    // console.log(actionDb);
    // const workerDb = await actionDb!.worker;
    //Find the owning hub
    const ownerHub = await this.hubService.getHubByWorkerId(workerDb.id);
    //If no hub owns the worker, the worker should not be able to get altered by a user.
    //If this happens, it's a bug
    if (!ownerHub) {
      throw new BadRequestException('Worker not online anymore');
    }
    //Find the socket of the hub
    const client = this.wsClients.get(ownerHub.socketId!);

    //If no socket is found, the hub is not online
    if (!client) {
      return;
    }
    //Send the new data to the client. The client expects to get the whole worker object including actions
    // const worker = ownerHub.workers.find((w) => w.id === wokerDb.id);
    const workerExtended = await this.workerService.findOneById(workerDb.id);
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
    const client = this.wsClients.get(hubDb.socketId!);
    //If no socket is found, the hub is not online
    if (!client) {
      throw new BadRequestException('Hub not online');
    }
    client.emit('instantAction', workerId);
  }
}
