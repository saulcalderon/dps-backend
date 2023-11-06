import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
