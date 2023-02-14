import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.userService.findOne(createUserDto.username)) {
      throw new ConflictException('User already exists');
    }
    return await this.userService.create(createUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete users own acount' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req) {
    return await this.userService.remove(req.user.userId);
  }
}
