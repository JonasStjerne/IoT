import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
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
export class EventGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  constructor(
    private readonly eventService: EventService,
    private readonly hubsService: HubService,
    private readonly authService: AuthService,
  ) {}

  //Event for testing
  // @UseGuards(WsGuard)
  @SubscribeMessage('serverEvent')
  async clientEvent(@Request() req: any, @MessageBody() text: string) {
    console.log('serverEvent: ', req.hub);
    return;
  }

  async handleConnection(socket: Socket, @Request() req: any) {
    console.log('Soclket connected');
    //Manually authenticate socket because guards not working on lifecycle hooks
    const basicToken = socket.handshake.headers.authorization
      .split(' ')[1]
      .split('.');
    const [id, secret] = basicToken;
    if (!id || !secret) {
      socket.disconnect(true);
    }
    const hub = await this.authService.validateHub(id, secret);
    if (!hub) {
      socket.disconnect(true);
    }
    this.hubsService.setSocketId(hub.id, socket.id);
    this.hubsService.setState(hub.id, HubState.ONLINE);

    //Return all workers of hub and their actions
    return;
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
