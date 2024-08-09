import { Account, Room } from '@prisma/client';

export class Hotel {
  id: string;
  name: string;
  crn: string;
  email: string;
  phone: string;
  accountId: string;
  updatedAt: string;
  createdAt: string;
  account: Account;
  rooms: Room[];
}
