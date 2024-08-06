import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const room = new Room();
    Object.assign(room, {
      ...createRoomDto,
    });
    await this.prisma.room.create({ data: { ...room } });
    return plainToInstance(Room, room);
  }

  async findAll() {
    const rooms = await this.prisma.room.findMany();
    return plainToInstance(Room, rooms);
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id: id },
    });
    return plainToInstance(Room, room);
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const updateRoom = await this.prisma.room.update({
      where: { id },
      data: { ...updateRoomDto },
    });
    return plainToInstance(Room, updateRoom);
  }

  async remove(id: number) {
    await this.prisma.room.delete({ where: { id } });
  }
}
