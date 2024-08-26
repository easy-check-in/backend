import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { HotelsService } from '../hotels/hotels.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private hotelService: HotelsService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    return await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        hotelId: hotel.id,
      },
    });
  }

  async findAll(accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    return await this.prisma.category.findMany({
      where: { hotelId: hotel.id },
    });
  }

  async findOne(id: string, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    return await this.findCategoryOrError(id, hotel.id);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    accountId: string,
  ) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    const category = await this.findCategoryOrError(id, hotel.id);

    return await this.prisma.category.update({
      where: { id: category.id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string, accountId: string) {
    const hotel = await this.hotelService.findHotelOrError(accountId);
    const category = await this.findCategoryOrError(id, hotel.id);

    return await this.prisma.category.delete({
      where: { id: category.id },
    });
  }

  async findCategoryOrError(id: string, hotelId: string) {
    const category = await this.prisma.category.findFirst({
      where: { id, hotelId },
    });
    if (!category) throw new NotFoundException('category not found');
    return category;
  }
}
