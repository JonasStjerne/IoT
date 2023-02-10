/* tslint:disable */
/* eslint-disable */
import { Worker } from './worker';
export interface Action {
  durationSeconds: number;
  executeDateTime: string;
  id: string;
  isComplete: boolean;
  repeat: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  worker: Worker;
}
