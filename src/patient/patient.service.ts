import { ConflictException, Injectable } from '@nestjs/common';

import { FirebaseService } from 'src/auth/services/firebase.service';
import { LoggedUser } from 'src/common/interfaces/logged-user.interface';

import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(
    user: LoggedUser,
    createPatientDto: CreatePatientDto,
  ): Promise<void> {
    const firestore = this.firebaseService.getFireStore();

    const existingPatient = await firestore
      .collection('patients')
      .where('firstName', '==', createPatientDto.firstName)
      .where('lastName', '==', createPatientDto.lastName)
      .where('birthDate', '==', createPatientDto.birthDate)
      .where('userId', '==', user.uid)
      .get();

    if (!existingPatient.empty) {
      throw new ConflictException('Patient already exists');
    }

    await firestore.collection('patients').add({
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      birthDate: createPatientDto.birthDate,
      notes: createPatientDto.notes || null,
      userId: user.uid,
    });
  }
}
