import { Hotel } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Account {
  id: string;
  username: string;
  hotel: Hotel[];
  @Exclude()
  password: string;
  updatedAt: string;
  createdAt: string;
}
