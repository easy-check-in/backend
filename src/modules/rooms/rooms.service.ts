import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { HotelsService } from '../hotels/hotels.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private hotelService: HotelsService,
  ) {}

  async create(createRoomDto: CreateRoomDto, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    return await this.prisma.room.create({
      data: {
        ...createRoomDto,
        hotelId: hotel.id,
      },
    });
  }

  async findAll(accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    return await this.prisma.room.findMany({
      where: { hotelId: hotel.id },
    });
  }

  async findOne(id: string, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    return await this.findRoomOrError(id, hotel.id);
  }

  async update(id: string, updateRoomDto: UpdateRoomDto, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    const room = await this.findRoomOrError(id, hotel.id);

    return await this.prisma.room.update({
      where: { id: room.id },
      data: updateRoomDto,
    });
  }

  async remove(id: string, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    const room = await this.findRoomOrError(id, hotel.id);

    return await this.prisma.room.delete({
      where: { id: room.id },
    });
  }

  async findRoomOrError(id: string, hotelId: string) {
    const room = await this.prisma.room.findFirst({
      where: { id, hotelId },
    });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }
}
