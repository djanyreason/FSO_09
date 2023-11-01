export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non-binary'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientNoPII = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
