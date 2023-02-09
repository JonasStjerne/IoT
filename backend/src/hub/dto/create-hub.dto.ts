import { OmitType, PickType } from '@nestjs/swagger';
import { Hub } from '../entities/hub.entity';

export class CreateHubDto extends PickType(Hub, []) {}
