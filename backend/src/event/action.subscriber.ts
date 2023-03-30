import { Action } from 'src/action/entities/action.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class ActionSubscriber implements EntitySubscriberInterface<Action> {
  /**
   * Indicates that this subscriber only listen to Action events.
   */
  listenTo() {
    return Action;
  }

  afterInsert(event: InsertEvent<Action>) {
    console.log(`BEFORE POST INSERTED: `, event.entity);
  }

  afterUpdate(event: UpdateEvent<Action>) {
    console.log(`AFTER POST INSERTED: `, event.entity);
  }

  afterRemove(event: RemoveEvent<Action>) {
    console.log(`AFTER POST INSERTED: `, event.entity);
  }
}
