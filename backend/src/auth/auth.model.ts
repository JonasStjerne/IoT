import { User } from 'src/users/entities/user.entity';

export class Auth<T> {
  user: AuthUser;
  body: T;
}

export class AuthUser {
  name: User['username'];
  sub: User['id'];
}
