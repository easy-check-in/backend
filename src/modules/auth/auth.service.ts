import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AccountsService } from '../accounts/accounts.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountsService,
    private jwtService: JwtService,
  ) {}
  async login({ username, password }: LoginDto) {
    const account = await this.accountService.findByUsername(username);
    if (!account) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const passwordMatch = await compare(password, account.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      token: this.jwtService.sign({ username }, { subject: account.id }),
    };
  }
}
