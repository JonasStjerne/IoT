/* tslint:disable */
/* eslint-disable */
import { Action } from './action';
import { Hub } from './hub';
export interface Worker {
  action: 'press';
  actions: Array<Action>;
  batteryLevel: number;
  hub: Hub;
  id: string;
  name: string;
  state: 'offline' | 'online';
  status: 'idle' | 'busy' | 'error';
}
