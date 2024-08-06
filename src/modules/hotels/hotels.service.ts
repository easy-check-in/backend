import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class HotelsService {
  constructor(private prisma: PrismaService) {}

  async create(createHotelDto: CreateHotelDto) {
    const hotel = new Hotel();
    Object.assign(hotel, {
      ...createHotelDto,
    });
    await this.prisma.hotel.create({ data: { ...hotel } });
    return plainToInstance(Hotel, hotel);
  }

  async findAll() {
    const hotels = await this.prisma.hotel.findMany();
    return plainToInstance(Hotel, hotels);
  }

  async findOne(id: string) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: id },
    });
    return plainToInstance(Hotel, hotel);
  }

  async update(id: string, updateHotelDto: UpdateHotelDto) {
    const updateHotel = await this.prisma.hotel.update({
      where: { id },
      data: { ...updateHotelDto },
    });
    return plainToInstance(Hotel, updateHotel);
  }

  async remove(id: string) {
    await this.prisma.hotel.delete({ where: { id } });
  }
}
