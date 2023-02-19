import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { WorkerStateChangeDto } from './dto/workerStateChange.dto';
import { Server } from 'socket.io';
import { WsGuard } from 'src/auth/ws.guard';
import { WsGuard } from 'src/auth/_guards/ws.guard';
import { UseGuards, Request } from '@nestjs/common';

@WebSocketGateway()
export class EventGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  constructor(private readonly eventService: EventService) {}

  @UseGuards(WsGuard)
  @SubscribeMessage('serverEvent')
  async clientEvent(@Request() req: any, @MessageBody() text: string) {
    console.log('serverEvent: ', req.hub);
    return;
  }
  @UseGuards(WsGuard)
  handleConnection(req: any) {
    //On connection send all data for hub and save socket id
    this.eventService.saveSocketId(req);
    // console.log({ req });
  }

  @SubscribeMessage('workerStateChange')
  create(@MessageBody() WorkerStateChangeDto: WorkerStateChangeDto) {
    return 'this should update the worker state in the db';
  }
}
