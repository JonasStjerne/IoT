import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  ValidationPipe,
} from '@nestjs/common';
import { HubService } from './hub.service';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/users/entities/user.entity';
import { Auth } from 'src/auth/_decorators/auth.decorator';
import { AuthUser } from 'src/auth/_decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Hub')
@Controller('hub')
export class HubController {
  constructor(private readonly hubService: HubService) {}

  @Post()
  @Auth(UserType.Admin)
  @ApiOperation({ summary: 'Create a new hub' })
  create(@Body() createHubDto: CreateHubDto) {
    return this.hubService.create(createHubDto);
  }

  @Delete(':id')
  @Auth(UserType.Admin)
  @ApiOperation({ summary: 'Delete hub' })
  async remove(@Param('id') hubId: string) {
    return await this.hubService.remove(hubId);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register hub to user' })
  @Auth()
  async register(
    @AuthUser('id') userId: User['id'],
    @Body(new ValidationPipe({ transform: true }))
    registerHubDto: RegisterHubDto,
  ) {
    console.log(registerHubDto);
    return await this.hubService.register(userId, registerHubDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all hubs connected to user' })
  @Auth()
  async findAll(@AuthUser('id') userId: User['id']) {
    return await this.hubService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return hub of user' })
  @Auth()
  async findOneBy(
    @AuthUser('id') userId: User['id'],
    @Param('id') hubId: string,
  ) {
    const hub = await this.hubService.findOneBy(userId, hubId);
    if (hub) {
      return hub;
    }
    throw new ForbiddenException(
      "You don't have access to this hub, or it doesn't exist",
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update hub of user' })
  @Auth()
  async Rename(
    @AuthUser('id') userId: User['id'],
    @Param('id') hubId: string,
    @Body() updateHubDto: UpdateHubDto,
  ) {
    const hubUpdate = await this.hubService.update(userId, hubId, updateHubDto);
    if (hubUpdate) {
      return hubUpdate;
    }
    throw new ForbiddenException(
      "You don't have access to this hub, or it doesn't exist",
    );
  }

  @Delete('unregister/:id')
  @ApiOperation({ summary: 'Delete users connection to hub' })
  @Auth()
  async unRegister(
    @AuthUser('id') userId: User['id'],
    @Param('id') hubId: string,
  ) {
    return await this.hubService.unRegister(userId, hubId);
  }
}
