import { useState } from 'react';
import axios from 'axios';

import { Button, TextField, Stack } from '@mui/material';

import { Entry } from '../../types';
import PatientService from '../../services/patients';

interface NHCEFProps {
  addEntry: (newEntry: Entry) => void;
  id: string;
}

const NewOccupationalHealthcareEntryForm = (props: NHCEFProps): JSX.Element => {
  const { addEntry, id } = props;

  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dcs, setDCs] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');

  const reset = () => {
    setDCs('');
    setDate('');
    setSpecialist('');
    setDescription('');
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEvent = { date, specialist, description, employerName };
    if (dcs !== '')
      Object.assign(newEvent, {
        diagnosisCodes: dcs.split(',').map((code) => code.trim())
      });

    if (sickLeaveStart !== '' || sickLeaveEnd !== '')
      Object.assign(newEvent, {
        sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd }
      });

    PatientService.addEntrytoPatient(id, {
      ...newEvent,
      type: 'OccupationalHealthcare'
    })
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
          label='Employer Name'
          value={employerName}
          onChange={(event) => setEmployerName(event.target.value)}
        />
        <TextField
          label='Sick Leave Start Date'
          value={sickLeaveStart}
          onChange={(event) => setSickLeaveStart(event.target.value)}
        />
        <TextField
          label='Sick Leave End Date'
          value={sickLeaveEnd}
          onChange={(event) => setSickLeaveEnd(event.target.value)}
        />
        <TextField
          label='Diagnosis codes'
          value={dcs}
          onChange={(event) => setDCs(event.target.value)}
        />
      </Stack>
      <br />
      <Stack direction='row' justifyContent='space-between'>
        <Button variant='contained' color='error' type='reset' onClick={reset}>
          Cancel
        </Button>
        <Button variant='outlined' color='primary' type='submit'>
          Add
        </Button>
      </Stack>
    </form>
  );
};

export default NewOccupationalHealthcareEntryForm;
