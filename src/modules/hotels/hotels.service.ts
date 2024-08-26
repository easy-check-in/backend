import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsService {
  constructor(private prisma: PrismaService) {}

  async create(createHotelDto: CreateHotelDto, accountId: string) {
    const hotel = new Hotel();
    Object.assign(hotel, {
      ...createHotelDto,
      accountId,
    });
    return await this.prisma.hotel.create({
      data: hotel,
    });
  }

  async findOne(accountId: string) {
    return await this.findHotelOrError(accountId);
  }

  async update(accountId: string, updateHotelDto: UpdateHotelDto) {
    await this.findHotelOrError(accountId);
    return await this.prisma.hotel.update({
      where: { accountId },
      data: { ...updateHotelDto },
    });
  }

  async remove(accountId: string) {
    await this.findHotelOrError(accountId);
    await this.prisma.hotel.delete({ where: { accountId } });
  }

  async findHotelOrError(accountId: string) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { accountId },
    });
    if (!hotel) throw new NotFoundException('Hotel not found');
    return hotel;
  }
}
