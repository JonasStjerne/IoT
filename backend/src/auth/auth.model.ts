import { User } from 'src/users/entities/user.entity';

export interface IAuth<T> {
  user: User;
  body: T;
}
