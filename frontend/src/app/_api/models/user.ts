/* tslint:disable */
/* eslint-disable */
import { Hub } from './hub';
export interface User {
  hubs: Array<Hub>;
  id: string;
  password: string;
  userType: 1 | 2;
  username: string;
}
