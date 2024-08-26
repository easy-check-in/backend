import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

@Module({
  controllers: [HotelsController],
  providers: [HotelsService, PrismaService],
  exports: [HotelsService],
})
export class HotelsModule {}
