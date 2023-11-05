import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase.guard';

import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(req.user, createPatientDto);
  }
}
