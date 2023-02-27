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
@UseGuards(WsGuard)
@WebSocketGateway()
export class EventGateway implements OnGatewayConnection {
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
    return;
  }
  async handleConnection(socket: Socket, @Request() req: any) {
    console.log('Soclket connected');
    // const hub = await this.authService.validateHub(id, secret);
    // console.log(hub);
    // if (!hub) {
    //   socket.disconnect(true);
    // }
    // //On connection send all data for hub and save socket id
    // console.log('Connected to hub: ', hub.id);
    // const workers = await this.hubsService.getWorkersOfHub(req.hub.id);
    return;
    // console.log({ req });
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
