import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateHotelDto {
  @ApiProperty({
    description: 'Hotel name',
    example: 'Hotel ABC',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'CRN (Commercial Registration Number)',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  crn: string;

  @ApiProperty({
    description: 'Hotel email',
    example: 'hotel@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Hotel phone number',
    example: '1212341234',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsUUID()
  accountId: string;
}
