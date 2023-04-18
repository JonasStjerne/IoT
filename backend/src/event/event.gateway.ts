import { Request, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthHub } from '../auth/_decorators/hub.decorator';
import { WsGuard } from '../auth/_guards/ws.guard';
import { Hub } from '../hub/entities/hub.entity';
import { HubService } from '../hub/hub.service';
import { BatteryLevelDto } from './dto/batteryLevel.dto';
import { EventService } from './event.service';
@UseGuards(WsGuard)
@WebSocketGateway()
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
    private readonly eventService: EventService,
    private readonly hubsService: HubService,
  ) {}

  //Event for testing
  @UseGuards(WsGuard)
  @SubscribeMessage('serverEvent')
  async clientEvent(@Request() req: any, @MessageBody() text: string) {
    const result = await this.eventService.getHubData(req.hub.id);
    return;
  }

  async handleConnection(socket: Socket) {
    //Manually authenticate socket because guards not working on lifecycle hooks
    const hub = await this.eventService.isAuthenticatedHub(socket);
    if (!hub) {
      console.log('Hub not authenticated');
      socket.disconnect(true);
      return;
    }
    console.log('Hub authenticated');
    await this.eventService.hubConnected(hub, socket);
  }

  @SubscribeMessage('workerConnect')
  async workerConnect(
    @ConnectedSocket() client: Socket,
    @AuthHub() hub: Hub,
    @MessageBody() workerId: string,
  ) {
    const worker = await this.hubsService.setWorkerOfHub(hub, workerId);

    return client.emit('workerData', worker);
  }

  @SubscribeMessage('workerDisconnect')
  async workerDisconnect(
    @ConnectedSocket() client: Socket,
    @AuthHub() hub: Hub,
    @MessageBody() workerId: string,
  ) {
    await this.hubsService.deleteRelationToWorker(hub, workerId);
  }

  @SubscribeMessage('batteryData')
  async updateWorkerBatteryLevel(
    @ConnectedSocket() client: Socket,
    @AuthHub() hub: Hub,
    @MessageBody() batteryLevelDto: BatteryLevelDto,
  ) {
    await this.hubsService.updateWorkerBatteryLevel(hub, batteryLevelDto);
  }

  async handleDisconnect(socket: Socket) {
    const hub = await this.eventService.isAuthenticatedHub(socket);
    if (!hub) {
      return;
    }
    this.eventService.hubDisconnected(hub, socket);
  }
}
