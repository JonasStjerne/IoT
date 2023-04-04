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
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/auth/_guards/ws.guard';
import { UseGuards, Request } from '@nestjs/common';
import { HubService } from 'src/hub/hub.service';
import { AuthService } from 'src/auth/auth.service';
import { Hub, HubState } from 'src/hub/entities/hub.entity';
import { WorkerConnectDto } from './dto/workerConnect.dto';
import { AuthHub } from 'src/auth/_decorators/hub.decorator';
import { BatteryLevelDto } from './dto/batteryLevel.dto';
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
    // console.log('serverEvent: ', req.hub);
    const result = await this.eventService.getHubData(req.hub.id);
    // console.log('result: ', result);
    return;
  }

  async handleConnection(socket: Socket) {
    //Manually authenticate socket because guards not working on lifecycle hooks
    const hub = await this.eventService.isAuthenticatedHub(socket);
    if (!hub) {
      console.log('Hub not authenticated');
      socket.disconnect(true);
    }
    console.log('Hub authenticated');
    await this.eventService.hubConnected(hub.id, socket);
  }

  @SubscribeMessage('workerConnect')
  async workerConnect(
    @ConnectedSocket() client: Socket,
    @AuthHub() hub: Hub,
    @MessageBody() workerId: string,
  ) {
    // const workerData = await this.hubsService.getWorkersOfHub(hub.id);
    const worker = await this.hubsService.setWorkerOfHub(hub.id, workerId);

    return client.emit('workerData', worker);
  }

  @SubscribeMessage('workerDisconnect')
  async workerDisconnect(
    @ConnectedSocket() client: Socket,
    @AuthHub() hub: Hub,
    @MessageBody() workerId: string,
  ) {
    await this.hubsService.deleteRelationToWorker(hub.id, workerId);
  }

  @SubscribeMessage('batteryData')
  async updateWorkerBatteryLevel(
    @ConnectedSocket() client: Socket,
    @AuthHub() hub: Hub,
    @MessageBody() batteryLevelDto: BatteryLevelDto,
  ) {
    await this.hubsService.updateWorkerBatteryLevel(hub.id, batteryLevelDto);
  }

  async handleDisconnect(socket: Socket) {
    const hub = await this.eventService.isAuthenticatedHub(socket);
    if (!hub) {
      return;
    }
    this.eventService.hubDisconnected(hub.id, socket);
  }
}
