import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';

@Module({
  imports: [AuthModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
