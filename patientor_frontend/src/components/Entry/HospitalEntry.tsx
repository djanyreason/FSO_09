import { useState, useEffect } from 'react';

import DiagnosisRouter from '../../services/diagnoses';

import { Diagnosis, HospitalEntry as HEType } from '../../types';

import { Box, Typography } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';

interface EntryProps {
  entry: HEType;
}

const HospitalEntry = (props: EntryProps) => {
  const entry = props.entry;

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    DiagnosisRouter.getAll().then((response) => {
      setDiagnoses(response);
    });
  }, []);

  return (
    <Box sx={{ p: 1, border: '1px solid black', borderRadius: '5px' }}>
      <Typography variant='body1'>
        {entry.date} <LocalHospital />
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
      {!entry.discharge ? (
        <></>
      ) : (
        <Typography variant='body1'>
          Discharged on {entry.discharge.date} due to {entry.discharge.criteria}
        </Typography>
      )}
      <Typography variant='body1'>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntry;
