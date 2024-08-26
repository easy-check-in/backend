import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    await this.findUniqueUsername(createAccountDto.username);
    const account = new Account();
    Object.assign(account, {
      ...createAccountDto,
    });
    await this.prisma.account.create({ data: { ...account } });
    return plainToInstance(Account, account);
  }

  async findAll() {
    const accounts = await this.prisma.account.findMany();
    return plainToInstance(Account, accounts);
  }

  async findOne(id: string) {
    return await this.findAccountOrError(id);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    await this.findAccountOrError(id);
    if (updateAccountDto.username)
      await this.findUniqueUsername(updateAccountDto.username);
    const updateAccount = await this.prisma.account.update({
      where: { id },
      data: { ...updateAccountDto },
    });
    return plainToInstance(Account, updateAccount);
  }

  async remove(id: string) {
    await this.findAccountOrError(id);
    await this.prisma.account.delete({ where: { id } });
  }

  async findByUsername(username: string) {
    return await this.prisma.account.findUnique({
      where: { username },
    });
  }

  async findUniqueUsername(dtoUsername: string) {
    const findAccount = await this.findByUsername(dtoUsername);
    if (findAccount) throw new ConflictException('User name already exists');
  }

  async findAccountOrError(id: string) {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }
}
