/* tslint:disable */
/* eslint-disable */
import { Hub } from './hub';
export interface User {
  hubs: Array<Hub>;
  id: string;
  password: string;
  userType: 'Admin' | 'User';
  username: string;
}
