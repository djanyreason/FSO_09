import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import {
  PatientNoPII,
  NewPatient,
  Patient,
  EntryWithoutId,
  Entry
} from '../types';

const getPatients = (): PatientNoPII[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

interface getSuccess {
  result: 'Success';
  patient: Patient;
}

interface getFailure {
  result: 'Failure';
  code: number;
  message: string;
}

type getResponse = getSuccess | getFailure;

const getPatient = (id: string): getResponse => {
  const patientListofOne = patientData.filter((patient) => patient.id === id);

  if (patientListofOne.length !== 1)
    return patientListofOne.length === 0
      ? {
          result: 'Failure',
          code: 404,
          message: 'ID not present in database'
        }
      : {
          result: 'Failure',
          code: 500,
          message: 'ID refers to multiple entries'
        };

  if (
    patientListofOne[0].entries.reduce(
      (check, entry) =>
        check
          ? check
          : entry.type !== 'HealthCheck' &&
            entry.type !== 'OccupationalHealthcare' &&
            entry.type !== 'Hospital',
      false
    )
  )
    return {
      result: 'Failure',
      code: 500,
      message: 'Patient data contains malformatted healthcare entry'
    };

  return {
    result: 'Success',
    patient: patientListofOne[0]
  };
};

const addPatient = (newPatientInfo: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...newPatientInfo
  };

  patientData.push(newPatient);

  return newPatient;
};

const addEntrytoPatient = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  };
  if (!patient.entries) patient.entries = [newEntry];
  else patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntrytoPatient
};
