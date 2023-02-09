/* tslint:disable */
/* eslint-disable */
import { Hub } from './hub';
export interface User {
  hubs: Array<Hub>;
  id: number;
  password: string;
  username: string;
}
