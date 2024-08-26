import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Room capacity',
    example: '2 persons',
  })
  @IsNotEmpty()
  @IsString()
  capacity: string;

  @ApiProperty({
    description: 'Room price',
    example: 100.0,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Extra charge for additional person',
    example: 20.0,
  })
  @IsNotEmpty()
  @IsNumber()
  extraPersonCharge: number;
}
