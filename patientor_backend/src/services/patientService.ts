import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { PatientNoPII, NewPatient, Patient } from '../types';

const getPatients = (): PatientNoPII[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatientInfo: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...newPatientInfo
  };

  patientData.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  addPatient
};
