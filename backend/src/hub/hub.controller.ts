import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HubService } from './hub.service';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';

@Controller('hub')
export class HubController {
  constructor(private readonly hubService: HubService) {}

  //Should be guarded by auth for only admin users
  @Post()
  create(@Body() createHubDto: CreateHubDto) {
    return this.hubService.create(createHubDto);
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
