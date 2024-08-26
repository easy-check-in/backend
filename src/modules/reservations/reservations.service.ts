import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { HotelsService } from '../hotels/hotels.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private prisma: PrismaService,
    private hotelService: HotelsService,
  ) {}

  async create(createReservationDto: CreateReservationDto, categoryId: string) {
    const { startDate, endDate } = createReservationDto;
    const room = await this.prisma.room.findFirst({
      where: {
        categoryId,
        reservations: {
          none: {
            OR: [
              {
                startDate: { lte: endDate },
                endDate: { gte: startDate },
              },
            ],
          },
        },
      },
    });

    if (!room) {
      throw new BadRequestException(
        'No available rooms for the selected dates',
      );
    }

    return await this.prisma.reservation.create({
      data: {
        ...createReservationDto,
        roomId: room.id,
      },
    });
  }

  async findAll(accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    return await this.prisma.reservation.findMany({
      where: {
        room: {
          hotelId: hotel.id,
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.findReservationOrError(id);
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
    accountId: string,
  ) {
    await this.checkReservationPermission(id, accountId);
    return await this.prisma.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: string, accountId: string) {
    await this.checkReservationPermission(id, accountId);
    return await this.prisma.reservation.delete({
      where: { id },
    });
  }

  async findReservationOrError(id: string) {
    const reservation = await this.prisma.reservation.findFirst({
      where: { id },
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }

  async checkReservationPermission(id: string, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    const reservation = await this.findReservationOrError(id);

    const room = await this.prisma.room.findUnique({
      where: { id: reservation.roomId },
      include: { hotel: true },
    });

    if (room.hotelId !== hotel.id) {
      throw new BadRequestException(
        'You do not have permission to access this reservation',
      );
    }
  }
}
