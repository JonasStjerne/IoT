import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Headers,
} from '@nestjs/common';
import { HubService } from './hub.service';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/users/entities/user.entity';
import { Auth } from 'src/auth/_decorators/auth.decorator';

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
  remove(@Param('id') id: string) {
    return this.hubService.remove(id);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register hub to user' })
  @Auth()
  @ApiBody({ type: RegisterHubDto })
  async register(@Body() registerHubDto: RegisterHubDto) {
    return await this.hubService.register(registerHubDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all hubs connected to user' })
  @Auth()
  findAll() {
    return this.hubService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return hub of user' })
  @Auth()
  findOne(@Param('id') id: string) {
    return this.hubService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update hub of user' })
  @Auth()
  Rename(@Param('id') id: string, @Body() updateHubDto: UpdateHubDto) {
    return this.hubService.update(id, updateHubDto);
  }

  @Delete('unregister/:id')
  @ApiOperation({ summary: 'Delete users connection to hub' })
  @Auth()
  async unRegister(@Param('id') id: string) {
    return await this.hubService.unRegister(id);
  }
}
