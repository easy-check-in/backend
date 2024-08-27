import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CategoriesService } from '../categories/categories.service';
import { HotelsService } from '../hotels/hotels.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private hotelService: HotelsService,
    private categoryService: CategoriesService,
  ) {}

  async create(createRoomDto: CreateRoomDto, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    const category = await this.categoryService.findCategoryOrError(
      createRoomDto.categoryId,
      hotel.id,
    );

    const nextNumber = await this.findAvailableRoomNumber(
      category.id,
      hotel.id,
    );

    return await this.prisma.room.create({
      data: {
        categoryId: category.id,
        hotelId: hotel.id,
        number: nextNumber,
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
    const category = await this.categoryService.findCategoryOrError(
      updateRoomDto.categoryId,
      hotel.id,
    );

    const nextNumber = await this.findAvailableRoomNumber(
      category.id,
      hotel.id,
    );

    return await this.prisma.room.update({
      where: { id: room.id },
      data: { categoryId: category.id, number: nextNumber },
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

  async findAvailableRoomNumber(
    categoryId: string,
    hotelId: string,
  ): Promise<number> {
    const rooms = await this.prisma.room.findMany({
      where: {
        categoryId,
        hotelId,
      },
      orderBy: {
        number: 'asc',
      },
      select: {
        number: true,
      },
    });

    let nextNumber = 1;
    for (const room of rooms) {
      if (room.number !== nextNumber) {
        return nextNumber;
      }
      nextNumber++;
    }

    return nextNumber;
  }
}
