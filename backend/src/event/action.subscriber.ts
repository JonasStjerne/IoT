import { Inject, Injectable } from '@nestjs/common';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Action } from '../action/entities/action.entity';
import { EventService } from './event.service';

@Injectable()
export class ActionSubscriber implements EntitySubscriberInterface<Action> {
  constructor(
    private eventService: EventService,
    @Inject(Connection) readonly connection: Connection,
  ) {
    connection.subscribers.push(this);
  }
  /**
   * Indicates that this subscriber only listen to Action events.
   */
  listenTo() {
    return Action;
  }

  afterInsert(event: InsertEvent<Action>) {
    console.log(`AFTER ACTION INSERTED: `, event.entity);
    this.eventService.pushNewDataToClient(event.entity);
  }

  afterUpdate(event: UpdateEvent<Action>) {
    console.log(`AFTER ACTION UPDATE: `, event.entity);
    this.eventService.pushNewDataToClient(event.entity as Action);
  }

  async beforeSoftRemove(event: RemoveEvent<Action>) {
    console.log(`BEFORE ACTION REMOVE: `, event.entity);
    this.eventService.pushNewDataToClient(event.entity);
  }
}
