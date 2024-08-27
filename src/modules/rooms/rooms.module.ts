import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { HotelsModule } from '../hotels/hotels.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, PrismaService],
  imports: [HotelsModule, CategoriesModule],
})
export class RoomsModule {}
