import { useState } from 'react';
import axios from 'axios';

import { Box, Typography, Button, TextField, Stack } from '@mui/material';

import { Entry } from '../../types';
import PatientService from '../../services/patients';

interface NHCEFProps {
  addEntry: (newEntry: Entry) => void;
  id: string;
}

const NewHealthCheckEntryForm = (props: NHCEFProps) => {
  const { addEntry, id } = props;

  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dcs, setDCs] = useState<string>('');
  const [hcr, setHCR] = useState<string>('');

  const reset = () => {
    setDCs('');
    setDate('');
    setSpecialist('');
    setDescription('');
    setHCR('');
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (isNaN(Number(hcr))) {
      window.alert('Healthcheck Rating must be a number');
      return;
    }
    const healthCheckRating = Number(hcr);
    const newEvent = { date, specialist, description, healthCheckRating };
    if (dcs !== '')
      Object.assign(newEvent, {
        diagnosisCodes: dcs.split(',').map((code) => code.trim())
      });

    PatientService.addEntrytoPatient(id, { ...newEvent, type: 'HealthCheck' })
      .then((response) => {
        addEntry(response);
        reset();
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response)
          window.alert(error.response.data);
        else window.alert('Something went wrong');
      });
  };

  return (
    <Box sx={{ border: '2px black dotted' }} p={2}>
      <Typography variant='h6'>New HealthCheck Entry</Typography>
      <br />
      <form onSubmit={onSubmit}>
        <Stack spacing={1}>
          <TextField
            label='Description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            label='Date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <TextField
            label='Specialist'
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
          />
          <TextField
            label='HealthCheck rating'
            value={hcr}
            onChange={(event) => setHCR(event.target.value)}
          />
          <TextField
            label='Diagnosis codes'
            value={dcs}
            onChange={(event) => setDCs(event.target.value)}
          />
        </Stack>
        <br />
        <Stack direction='row' justifyContent='space-between'>
          <Button
            variant='contained'
            color='error'
            type='reset'
            onClick={reset}
          >
            Cancel
          </Button>
          <Button variant='outlined' color='primary' type='submit'>
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default NewHealthCheckEntryForm;
