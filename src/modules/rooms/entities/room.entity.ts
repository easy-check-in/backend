import { Reservation } from '@prisma/client';

export class Room {
  id: string;
  capacity: string;
  price: number;
  extraPersonCharge: number;
  hotelId: string;
  updatedAt: Date;
  createdAt: Date;
  reservation: Reservation[];
}
