/* tslint:disable */
/* eslint-disable */
export interface UpdateActionDto {
  durationSeconds?: number;
  executeDateTime?: string;
  repeat?: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';
}
