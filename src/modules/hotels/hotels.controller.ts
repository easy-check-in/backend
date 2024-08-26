import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelsService } from './hotels.service';

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
  update(
    @Param('id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
    @Req() req,
  ) {
    const accountId = req.user.id;
    return this.hotelsService.update(id, updateHotelDto, accountId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    const accountId = req.user.id;
    return this.hotelsService.remove(id, accountId);
  }
}
