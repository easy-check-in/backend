import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto, accountId: string) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { accountId },
      include: { rooms: true },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found for this account');
    }

    const room = hotel.rooms.find(
      (room) => room.id === createReservationDto.roomId,
    );
    if (!room) {
      throw new NotFoundException('Room not found in the hotel');
    }

    const reservation = await this.prisma.reservation.create({
      data: {
        ...createReservationDto,
        room: {
          connect: { id: createReservationDto.roomId },
        },
      },
    });
    return reservation;
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  async findReservationOrError(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }
}
