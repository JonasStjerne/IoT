import { User } from 'src/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: AuthUser;
}

export class AuthUser {
  username: User['username'];
  id: User['id'];
  userType: User['userType'];
}

export interface IJwtPayload {
  sub: User['id'];
  username: User['username'];
  userType: User['userType'];
}
