/* tslint:disable */
/* eslint-disable */
import { Hub } from './hub';
export interface CreateUserDto {
  hubs: Array<Hub>;
  password: string;
  username: string;
}
