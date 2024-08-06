import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    const reservation = new Reservation();
    Object.assign(reservation, {
      ...createReservationDto,
    });
    await this.prisma.reservation.create({ data: { ...reservation } });
    return plainToInstance(Reservation, reservation);
  }

  async findAll() {
    const reservations = await this.prisma.reservation.findMany();
    return plainToInstance(Reservation, reservations);
  }

  async findOne(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: id },
    });
    return plainToInstance(Reservation, reservation);
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const updateReservation = await this.prisma.reservation.update({
      where: { id },
      data: { ...updateReservationDto },
    });
    return plainToInstance(Reservation, updateReservation);
  }

  async remove(id: string) {
    await this.prisma.reservation.delete({ where: { id } });
  }
}
