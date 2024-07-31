import { Exclude } from 'class-transformer';

export class Account {
  id: string;
  username: string;
  @Exclude()
  password: string;
  updatedAt: string;
  createdAt: string;
}
