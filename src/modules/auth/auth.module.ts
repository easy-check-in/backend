import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Passport } from 'passport';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AccountsModule,
    Passport,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
