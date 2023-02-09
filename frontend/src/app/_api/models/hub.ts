/* tslint:disable */
/* eslint-disable */
import { User } from './user';
export interface Hub {
  id: string;
  name: string;
  secret: string;
  users: Array<User>;
}
