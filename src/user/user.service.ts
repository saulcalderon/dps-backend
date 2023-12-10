import { ConflictException, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/auth/services/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private async verifyUserExists(email: string): Promise<boolean> {
    const auth = this.firebaseService.getFirebaseApp().auth();
    const user = await auth.getUserByEmail(email).catch(() => undefined);
    return !!user;
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const userExists = await this.verifyUserExists(createUserDto.email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const auth = this.firebaseService.getFirebaseApp().auth();
    const userCreated = await auth.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    const firestore = this.firebaseService.getFireStore();
    firestore.collection('users').doc(userCreated.uid).set({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      specialization: createUserDto.specialization,
    });
  }

  async getMe(user: any): Promise<any> {
    const firestore = this.firebaseService.getFireStore();
    const userDoc = await firestore.collection('users').doc(user.uid).get();
    return userDoc.data();
  }
}
