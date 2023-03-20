import { PickType } from '@nestjs/swagger';
import { Action } from '../entities/action.entity';

export class CreateActionDto extends PickType(Action, ['repeat','executeDateTime','durationSeconds'] as const) {}
