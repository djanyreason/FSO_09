import { useMatch, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Patient, Gender, Entry as EntryType } from '../../types';
import PatientService from '../../services/patients';
import Entry from './Entry/Entry';

import { Male, Female, Transgender } from '@mui/icons-material';
import { Typography, Stack } from '@mui/material';
import NewHealthCheckEntryForm from './NewHealthCheckEntryForm';

const PatientInfo = () => {
  const navigate = useNavigate();
  const match = useMatch('patients/:id');
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (match === null || !match.params.id) {
      navigate('/');
    } else {
      PatientService.getOne(match.params.id)
        .then((response) => {
          if (!response) navigate('/');
          setPatient(response);
        })
        .catch(() => {
          navigate('/');
        });
    }
  }, [match, navigate]);

  if (!patient) return <h2>loading...</h2>;

  const addEntry = (newEntry: EntryType): void => {
    if (!patient.entries) setPatient({ ...patient, entries: [newEntry] });
    else setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
  };

  return (
    <div>
      <br />
      <Typography variant='h5' style={{ fontWeight: 600 }}>
        {patient.name}{' '}
        {patient.gender === Gender.Male ? (
          <Male />
        ) : patient.gender === Gender.Female ? (
          <Female />
        ) : (
          <Transgender />
        )}
      </Typography>
      <br />
      <Typography variant='body1'>ssh: {patient.ssn}</Typography>
      <Typography variant='body1'>occupation: {patient.occupation}</Typography>
      <br />
      <Typography variant='h6' style={{ fontWeight: 600 }}>
        entries
      </Typography>
      <br />
      <NewHealthCheckEntryForm addEntry={addEntry} id={patient.id} />
      <br />
      <Stack spacing={1}>
        {patient.entries.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </Stack>
    </div>
  );
};

export default PatientInfo;
