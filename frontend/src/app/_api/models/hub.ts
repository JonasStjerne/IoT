/* tslint:disable */
/* eslint-disable */
import { User } from './user';
import { Worker } from './worker';
export interface Hub {
  id: string;
  name: null | string;
  secret: string;
  socketId: null | string;
  state: 'ONLINE' | 'OFFLINE';
  users: Array<User>;
  workers: Array<Worker>;
}
