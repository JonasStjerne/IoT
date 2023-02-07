import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiProperty,
  ApiQuery,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './users/dto/login-user.dto';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @ApiBody({
    type: LoginUserDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  //Protected route
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protected(@Request() req): string {
    return req.user;
  }
}
