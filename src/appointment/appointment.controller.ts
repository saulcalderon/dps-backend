import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';

import { FirebaseAuthGuard } from 'src/auth/guards/firebase.guard';

import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  create(
    @Request() req: any,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentService.create(req.user, createAppointmentDto);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.appointmentService.findAll(req.user);
  }
}
