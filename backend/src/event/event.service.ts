import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  saveSocketId(req: any) {
    // console.log('saveSocketId', req);
  }

  async workerStateChange() {
    return 'this should update the worker state in the db';
  }
}
