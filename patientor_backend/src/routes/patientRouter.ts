import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const getResponse = patientService.getPatient(req.params.id);
  if (getResponse.result === 'Success') res.send(getResponse.patient);
  else res.status(getResponse.code).send(getResponse.message);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Someething went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const patientResponse = patientService.getPatient(req.params.id);
  if (patientResponse.result === 'Failure')
    res.status(patientResponse.code).send(patientResponse.message);
  else {
    try {
      const newEntry = toNewEntry(req.body);
      patientService.addEntrytoPatient(patientResponse.patient, newEntry);
      res.json(newEntry);
    } catch (error: unknown) {
      let errorMessage = 'Someething went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  }
});

export default router;
