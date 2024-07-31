import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateRoomDto {
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

  @ApiProperty({
    description: 'Hotel ID associated with the room',
    example: 'abc123',
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;
}
