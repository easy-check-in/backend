import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'ID da categoria do quarto',
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId?: string;
}
