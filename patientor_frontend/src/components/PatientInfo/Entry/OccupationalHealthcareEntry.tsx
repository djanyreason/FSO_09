import { useState, useEffect } from 'react';

import DiagnosisRouter from '../../../services/diagnoses';

import {
  Diagnosis,
  OccupationalHealthcareEntry as OHEType
} from '../../../types';

import { Box, Typography } from '@mui/material';
import { MedicalServices } from '@mui/icons-material';

interface EntryProps {
  entry: OHEType;
}

const OccupationalHealthcareEntry = (props: EntryProps) => {
  const entry = props.entry;

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    DiagnosisRouter.getAll().then((response) => {
      setDiagnoses(response);
    });
  }, []);

  return (
    <Box sx={{ border: '1px solid black', borderRadius: '5px' }} p={1} m={1}>
      <Typography variant='body1'>
        {entry.date} <MedicalServices /> {entry.employerName}
      </Typography>
      <Typography variant='body1'>
        <em>{entry.description}</em>
      </Typography>
      {!entry.diagnosisCodes ? (
        <></>
      ) : (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code}{' '}
              {diagnoses.reduce(
                (desc, diag) =>
                  desc === '' ? (diag.code === code ? diag.name : '') : desc,
                ''
              )}
            </li>
          ))}
        </ul>
      )}
      {!entry.sickLeave ? (
        <></>
      ) : (
        <Typography variant='body1'>
          sick leave from {entry.sickLeave.startDate} to{' '}
          {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography variant='body1'>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalHealthcareEntry;
