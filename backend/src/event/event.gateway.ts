import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  WsException,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { WorkerStateChangeDto } from './dto/workerStateChange.dto';
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/auth/_guards/ws.guard';
import { UseGuards, Request } from '@nestjs/common';
import { HubService } from 'src/hub/hub.service';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Hub, HubState } from 'src/hub/entities/hub.entity';
import { ConnectedWorkersDto } from './dto/connectedWorkers.dto';
import { AuthHub } from 'src/auth/_decorators/hub.decorator';
@UseGuards(WsGuard)
@WebSocketGateway()
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
    private readonly eventService: EventService,
    private readonly hubsService: HubService,
    private readonly authService: AuthService,
  ) {}

  //Event for testing
  @UseGuards(WsGuard)
  @SubscribeMessage('serverEvent')
  async clientEvent(@Request() req: any, @MessageBody() text: string) {
    console.log('serverEvent: ', req.hub);
    const result = await this.eventService.getHubData(req.hub.id);
    console.log('result: ', result);
    return;
  }

  async handleConnection(socket: Socket) {
    //Manually authenticate socket because guards not working on lifecycle hooks
    const hub = await this.eventService.isAuthenticatedHub(socket);
    if (!hub) {
      console.log('Hub not authenticated');
      socket.disconnect(true);
      throw new WsException('Wrong credentiels');
    }
    console.log('Hub authenticated');
    await this.hubsService.setSocketId(hub.id, socket.id);
    await this.hubsService.setState(hub.id, HubState.ONLINE);
  }

  @SubscribeMessage('connectedWorkers')
  async connectedWorkers(
    @ConnectedSocket() client: Socket,
    @AuthHub() hub: Hub,
    @MessageBody() connectedWorkersDto: ConnectedWorkersDto,
  ) {
    // const workerData = await this.hubsService.getWorkersOfHub(hub.id);
    const hubDb = await this.hubsService.setWorkersOfHub(
      hub.id,
      connectedWorkersDto.workers,
    );

    return client.emit('workerData', hubDb.workers);
  }

  @SubscribeMessage('workerStateChange')
  create(@MessageBody() WorkerStateChangeDto: WorkerStateChangeDto) {
    return 'this should update the worker state in the db';
  }

  async handleDisconnect(socket: Socket) {
    const hub = await this.eventService.isAuthenticatedHub(socket);
    if (!hub) {
      return;
    }
    this.hubsService.setSocketId(hub.id, null);
    this.hubsService.setState(hub.id, HubState.OFFLINE);
  }
}
