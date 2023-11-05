import { useMatch, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Patient, Gender } from '../types';
import PatientService from '../services/patients';

import { Male, Female, Transgender } from '@mui/icons-material';
import { Typography } from '@mui/material';

const PatientInfo = () => {
  const navigate = useNavigate();
  const match = useMatch('patients/:id');
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (match === null || !match.params.id || match.params.id === 'letstest') {
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
    </div>
  );
};

export default PatientInfo;
