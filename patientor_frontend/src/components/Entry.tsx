import { useState, useEffect } from 'react';

import DiagnosisRouter from '../services/diagnoses';

import { Entry as EntryType, Diagnosis } from '../types';

import { Typography } from '@mui/material';

interface EntryProps {
  entry: EntryType;
}

const Entry = (props: EntryProps) => {
  const entry = props.entry;

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    DiagnosisRouter.getAll().then((response) => {
      setDiagnoses(response);
    });
  }, []);

  return (
    <div>
      <br />
      <Typography variant='body1'>
        {entry.date} <em>{entry.description}</em>
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
    </div>
  );
};

export default Entry;
