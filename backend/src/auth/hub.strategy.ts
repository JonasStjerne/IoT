import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Hub } from 'src/hub/entities/hub.entity';
import { AuthService } from 'src/auth/auth.service';
import { IAuthHub } from './auth.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'hub') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(id: Hub['id'], secret: Hub['secret']): Promise<IAuthHub> {
    const hub = await this.authService.validateHub(id, secret);

    if (!hub) {
      throw new UnauthorizedException('Wrong password or email');
    }

    return hub;
  }
}
