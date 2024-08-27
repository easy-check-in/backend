import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateHotelDto {
  @ApiProperty({
    description: 'Nome do Hotel',
    example: 'Hotel ABC',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'CNPJ da Empresa',
    example: '12345678901234',
  })
  @IsNotEmpty()
  @IsString()
  crn: string;

  @ApiProperty({
    description: 'Email do Hotel',
    example: 'hotel@exemplo.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Número de telefone do Hotel',
    example: '(12) 1234-5678',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
