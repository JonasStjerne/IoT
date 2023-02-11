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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.model';

@ApiTags('Hub')
@Controller('hub')
export class HubController {
  constructor(private readonly hubService: HubService) {}

  //TODO Should be guarded by auth for only admin users
  @ApiOperation({ summary: 'Create a new hub' })
  @Post()
  create(@Body() createHubDto: CreateHubDto) {
    return this.hubService.create(createHubDto);
  }

  //TODO Should be guarded by auth for only admin users
  @ApiOperation({ summary: 'Delete hub' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hubService.remove(+id);
  }

  @ApiOperation({ summary: 'Register hub to user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: RegisterHubDto })
  @Post('register')
  async register(@Request() req: Auth<RegisterHubDto>) {
    return await this.hubService.register(req.user, req.body);
  }

  @ApiOperation({ summary: 'Return all hubs connected to user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: Auth<null>) {
    return this.hubService.findAll(req.user);
  }

  @ApiOperation({ summary: 'Return hub of user (not implementet)' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    //TODO implement findOne in service
    return this.hubService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update hub of user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  Rename(@Param('id') id: string, @Body() updateHubDto: UpdateHubDto) {
    return this.hubService.update(id, updateHubDto);
  }

  @ApiOperation({ summary: 'Delete users connection to hub' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('unregister/:id')
  async unRegister(@Param('id') id: string) {
    return await this.hubService.unRegister(id);
  }
}
