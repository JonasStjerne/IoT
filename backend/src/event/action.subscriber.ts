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
  // afterTransactionCommit(event: TransactionCommitEvent) {
  //   console.log(`AFTER ACTION INSERTED: `, event);
  // }

  afterInsert(event: InsertEvent<Action>) {
    console.log(`AFTER ACTION INSERTED: `, event.entity);
    this.eventService.pushNewDataToClient(event.entity);
  }

  async afterUpdate(event: UpdateEvent<Action>) {
    console.log(`AFTER ACTION UPDATE: `, event.entity);
    await this.eventService.pushNewDataToClient(event.entity as Action);
  }

  async beforeRemove(event: RemoveEvent<Action>) {
    console.log(`BEFORE ACTION REMOVE: `, event.entity);
    await this.eventService.pushNewDataToClient(event.entity!);
  }
}
