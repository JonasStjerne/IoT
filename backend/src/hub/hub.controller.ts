import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/_decorators/auth.decorator';
import { AuthUser } from '../auth/_decorators/user.decorator';
import { User, UserType } from '../users/entities/user.entity';
import { CreateHubDto } from './dto/create-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { RenameHubDto } from './dto/update-hub.dto';
import { HubService } from './hub.service';

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
  async findAll(@AuthUser() user: User) {
    return await this.hubService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return hub of user' })
  @Auth()
  async findOneBy(@AuthUser() user: User, @Param('id') hubId: string) {
    const hub = await this.hubService.findOneBy(user, hubId);
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
    @AuthUser() user: User,
    @Param('id') hubId: string,
    @Body() renameHubDto: RenameHubDto,
  ) {
    const hubUpdate = await this.hubService.update(user, hubId, renameHubDto);
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
