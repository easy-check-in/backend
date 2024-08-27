import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelsService } from './hotels.service';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createHotelDto: CreateHotelDto, @Req() req) {
    const accountId = req.user.id;
    return this.hotelsService.create(createHotelDto, accountId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req) {
    const accountId = req.user.id;
    return this.hotelsService.findOne(accountId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Body() updateHotelDto: UpdateHotelDto, @Req() req) {
    const accountId = req.user.id;
    return this.hotelsService.update(updateHotelDto, accountId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req) {
    const accountId = req.user.id;
    return this.hotelsService.remove(accountId);
  }
}
