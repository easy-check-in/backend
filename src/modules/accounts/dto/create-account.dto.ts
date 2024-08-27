import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'User name',
    example: 'johndoe',
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({
    description: 'Senha do usuario',
    example: 'mypassword',
  })
  @IsString()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password: string;
}
