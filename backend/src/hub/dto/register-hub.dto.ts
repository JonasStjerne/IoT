import { PickType } from '@nestjs/swagger';
import { Hub } from '../entities/hub.entity';

export class RegisterHubDto extends PickType(Hub, ['id', 'secret'] as const) {}
