import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService, LoginResponse } from './auth.service';
import { LocalAuthGuard } from './_guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: LoginUserDto,
  })
  @ApiResponse({
    type: LoginResponse,
  })
  @ApiOperation({ summary: 'Login to get users access token' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
