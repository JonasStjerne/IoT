import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.userService.findOne(createUserDto.username)) {
      throw new Error('User already exists');
    }
    return await this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req) {
    return await this.userService.remove(req.user.userId);
  }
}
