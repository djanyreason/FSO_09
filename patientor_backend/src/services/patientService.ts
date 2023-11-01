import patientData from '../../data/patients';
import { PatientNoPII } from '../types';

const getPatients = (): PatientNoPII[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients
};
