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
} from '@nestjs/common';
import { HubService } from './hub.service';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { RegisterHubDto } from './dto/register-hub.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IAuth } from 'src/auth/auth.model';

@Controller('hub')
export class HubController {
  constructor(private readonly hubService: HubService) {}

  //Should be guarded by auth for only admin users
  @Post()
  create(@Body() createHubDto: CreateHubDto) {
    return this.hubService.create(createHubDto);
  }

  //Register hub to user
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Request() req: IAuth<RegisterHubDto>) {
    return await this.hubService.register(req.user, req.body);
  }

  //Return all hubs for user
  @Get()
  findAll() {
    return this.hubService.findAll();
  }

  //Get hub if user have relation to it
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hubService.findOne(+id);
  }

  //Update hub if user have relation to it
  @Patch(':id')
  Rename(@Param('id') id: string, @Body() updateHubDto: UpdateHubDto) {
    return this.hubService.update(+id, updateHubDto);
  }

  //Delete relation to hub if user have relation to it
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hubService.remove(+id);
  }
}
