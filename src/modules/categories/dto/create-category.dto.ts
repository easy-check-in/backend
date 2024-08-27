import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Capacidade do Quarto',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty({
    description: 'Preço do quarto',
    example: 100.0,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Valor adicional por pessoa',
    example: 20.0,
  })
  @IsNotEmpty()
  @IsNumber()
  extraPersonCharge: number;
}
