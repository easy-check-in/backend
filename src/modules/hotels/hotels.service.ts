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
    const createdHotel = await this.prisma.hotel.create({
      data: hotel,
    });

    return createdHotel;
  }

  async findAll() {
    return await this.prisma.hotel.findMany();
  }

  async findOne(id: string) {
    return await this.findHotelOrError(id);
  }

  async update(id: string, updateHotelDto: UpdateHotelDto) {
    await this.findHotelOrError(id);
    const updatedHotel = await this.prisma.hotel.update({
      where: { id },
      data: { ...updateHotelDto },
    });
    return updatedHotel;
  }

  async remove(id: string) {
    return `This action removes a #${id} hotel`;
  }

  async findHotelOrError(id: string) {
    const hotel = await this.prisma.hotel.findUnique({ where: { id } });
    if (!hotel) throw new NotFoundException('Hotel not found');
    return hotel;
  }
}
