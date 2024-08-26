import { Module } from '@nestjs/common';
import { HotelsModule } from '../hotels/hotels.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [HotelsModule],
})
export class CategoriesModule {}
