import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Query('categoryId') categoryId: string,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.create(createReservationDto, categoryId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    const accountId = req.user.id;
    return this.reservationsService.findAll(accountId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
    @Req() req,
  ) {
    const accountId = req.user.id;
    return this.reservationsService.update(id, updateReservationDto, accountId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    const accountId = req.user.id;
    return this.reservationsService.remove(id, accountId);
  }
}
