import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.FIREBASE_PUBLIC_CERTIFICATE,
    });
  }

  validate(payload: any) {
    const user = {
      uid: payload.user_id,
      email: payload.email,
    };

    return user;
  }
}
