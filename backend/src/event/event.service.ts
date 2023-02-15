import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  saveSocketId(req: any) {
    console.log('saveSocketId', req);
  }
}
