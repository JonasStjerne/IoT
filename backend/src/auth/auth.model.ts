import { User } from 'src/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: AuthUser;
}

export class AuthUser {
  username: User['username'];
  userId: User['id'];
}

export class Auth<T> {
  user: AuthUser;
  body: T;
}
