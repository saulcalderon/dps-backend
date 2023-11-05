import { Injectable, OnModuleInit } from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp: admin.app.App;

  onModuleInit() {
    try {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });

      console.log('Firebase Admin initialized');
    } catch (error) {
      console.log('Firebase Admin initialization error', error);
    }
  }

  getFirebaseApp(): admin.app.App {
    return this.firebaseApp;
  }

  getFireStore() {
    return this.firebaseApp.firestore();
  }
}
