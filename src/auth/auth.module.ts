import { Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';

@Module({
  imports: [],
  providers: [FirebaseAuthStrategy],
  exports: [FirebaseAuthStrategy],
})
export class AuthModule {}
