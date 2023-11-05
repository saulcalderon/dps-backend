export interface Patient {
  id: string;

  firstName: string;

  lastName: string;

  birthDate: Date;

  notes: string;

  userId?: string;
}
