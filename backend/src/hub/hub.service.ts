import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateHubDto } from './dto/create-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';

@Injectable()
export class HubService {
  register(user: User, hub: RegisterHubDto) {
    if (this.validateHubCredentials(hub.id, hub.secret)) {
      //add realtion to user
    }
    //else return unauthorized
    return 'This action registers a hub to a user';
  }

  validateHubCredentials(id: string, secret: string) {
    return 'This action validates hub credentials';
  }

  create(createHubDto: CreateHubDto) {
    return 'This action adds a new hub';
  }

  findAll() {
    return `This action returns all hub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hub`;
  }

  update(id: number, updateHubDto: UpdateHubDto) {
    return `This action updates a #${id} hub`;
  }

  remove(id: number) {
    return `This action removes a #${id} hub`;
  }
}
