/* tslint:disable */
/* eslint-disable */
export interface CreateActionDto {
  durationSeconds: number;
  executeDateTime: string;
  repeat: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';
}
