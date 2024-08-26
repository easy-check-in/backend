import { Module } from '@nestjs/common';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    AuthModule,
    AccountsModule,
    HotelsModule,
    RoomsModule,
    ReservationsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
