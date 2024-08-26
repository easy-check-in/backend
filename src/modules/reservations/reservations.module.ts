import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { HotelsModule } from '../hotels/hotels.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService],
  imports: [HotelsModule],
})
export class ReservationsModule {}
