import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const basicToken = context.args[0].handshake.headers.authorization
      .split(' ')[1]
      .split('.');
    const [id, secret, ...rest] = basicToken;
    console.log({ id, secret });
    if (!id || !secret) {
      return false;
    }
    return this.authService.validateHub(id, secret);

    // return new Promise((resolve, reject) => {
    //   return this.userService
    //     .findByUsername(decoded.username)
    //     .then((user) => {
    //       if (user) {
    //         resolve(user);
    //       } else {
    //         reject(false);
    //       }
    //     });
    // });
  }
}
