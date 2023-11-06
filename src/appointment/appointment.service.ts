import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/auth/services/firebase.service';
import { LoggedUser } from 'src/common/interfaces/logged-user.interface';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './interfaces/appointment.interface';

@Injectable()
export class AppointmentService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(
    user: LoggedUser,
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<void> {
    // TODO: Validate appointment is already created
    const firestore = this.firebaseService.getFireStore();

    const existingPatient = await firestore
      .collection('patients')
      .doc(createAppointmentDto.patientId)
      .get();

    if (!existingPatient.exists) {
      throw new Error('Patient does not exist');
    }

    await firestore.collection('appointments').add({
      patientId: createAppointmentDto.patientId,
      doctorId: user.uid,
      date: createAppointmentDto.date,
      time: createAppointmentDto.time,
      reason: createAppointmentDto.reason,
      notes: createAppointmentDto.notes || null,
    });
  }

  async findAll(user: LoggedUser): Promise<Appointment[]> {
    const firestore = this.firebaseService.getFireStore();

    const appointmentDocs = await firestore
      .collection('appointments')
      .where('doctorId', '==', user.uid)
      .get();

    if (appointmentDocs.empty) {
      return [];
    }

    const appointments: any = appointmentDocs.docs.map((appointment) => ({
      id: appointment.id,
      ...appointment.data(),
    }));

    const doctor = await firestore.collection('users').doc(user.uid).get();

    return Promise.all(
      appointments.map(async (appointment: any) => {
        const patient = await firestore
          .collection('patients')
          .doc(appointment.patientId)
          .get();

        delete appointment.patientId;
        delete appointment.doctorId;

        return {
          ...appointment,
          patientName: `${patient.get('firstName')} ${patient.get('lastName')}`,
          doctorName: `${doctor.get('firstName')} ${doctor.get('lastName')}`,
        };
      }),
    );
  }
}
