import { Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import { FirebaseService } from './services/firebase.service';

@Module({
  imports: [],
  providers: [FirebaseAuthStrategy, FirebaseService],
  exports: [FirebaseAuthStrategy, FirebaseService],
})
export class AuthModule {}
