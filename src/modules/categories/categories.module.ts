import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { HotelsModule } from '../hotels/hotels.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  imports: [HotelsModule],
  exports: [CategoriesService],
})
export class CategoriesModule {}
