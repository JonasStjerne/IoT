import { OmitType } from '@nestjs/swagger';
import { Hub } from '../entities/hub.entity';

export class CreateHubDto extends OmitType(Hub, ['id', 'secret', 'users']) {}
