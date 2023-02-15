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

@WebSocketGateway()
export class EventGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  constructor(private readonly eventService: EventService) {}

  @SubscribeMessage('serverEvent')
  clientEvent(@MessageBody() text: string) {
    console.log('serverEvent: ', text);
    return;
  }
  handleConnection(req: any) {
    //On connection send all data for hub and save socket id
    this.eventService.saveSocketId(req);
    console.log({ req });
  }

  @SubscribeMessage('workerStateChange')
  create(@MessageBody() WorkerStateChangeDto: WorkerStateChangeDto) {
    return 'this should update the worker state in the db';
  }
}
