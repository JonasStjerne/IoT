import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  WsException,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { WorkerStateChangeDto } from './dto/workerStateChange.dto';
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/auth/_guards/ws.guard';
import { UseGuards, Request } from '@nestjs/common';
import { HubService } from 'src/hub/hub.service';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { HubState } from 'src/hub/entities/hub.entity';
@UseGuards(WsGuard)
@WebSocketGateway()
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
    private readonly eventService: EventService,
    private readonly hubsService: HubService,
  ) {}

  //Event for testing
  // @UseGuards(WsGuard)
  @SubscribeMessage('serverEvent')
  async clientEvent(@Request() req: any, @MessageBody() text: string) {
    console.log('serverEvent: ', req.hub);
    const result = await this.eventService.getHubData(req.hub.id);
    console.log('result: ', result);
    return;
  }

  async handleConnection(socket: Socket, @Request() req: any) {
    console.log('Soclket connected');
    //Manually authenticate socket because guards not working on lifecycle hooks
    const hub = await this.eventService.isAuthenticatedHub(socket);
    if (!hub) {
      socket.disconnect(true);
    }
    this.hubsService.setSocketId(hub.id, socket.id);
    this.hubsService.setState(hub.id, HubState.ONLINE);

    return this.eventService.getHubData(hub.id);
  }

  async handleDisconnect(socket: Socket) {
    const hub = await this.eventService.isAuthenticatedHub(socket);
    if (!hub) {
      return;
    }
    this.hubsService.setSocketId(hub.id, null);
    this.hubsService.setState(hub.id, HubState.OFFLINE);
  }

  @SubscribeMessage('getWorkerData')
  async getWorkerData(@Request() req: any) {
    const workers = await this.hubsService.getWorkersOfHub(req.hub.id);
    console.log('getWorkerData: ', workers);
    return workers;
  }

  @SubscribeMessage('workerStateChange')
  create(@MessageBody() WorkerStateChangeDto: WorkerStateChangeDto) {
    return 'this should update the worker state in the db';
  }
}
