import { useState } from 'react';
import axios from 'axios';

import { Button, TextField, Stack } from '@mui/material';

import { Entry } from '../../types';
import PatientService from '../../services/patients';

interface NHCEFProps {
  addEntry: (newEntry: Entry) => void;
  id: string;
}

const NewHospitalEntryForm = (props: NHCEFProps): JSX.Element => {
  const { addEntry, id } = props;

  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dcs, setDCs] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const reset = () => {
    setDCs('');
    setDate('');
    setSpecialist('');
    setDescription('');
    setDischargeCriteria('');
    setDischargeDate('');
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEvent = { date, specialist, description };
    if (dcs !== '')
      Object.assign(newEvent, {
        diagnosisCodes: dcs.split(',').map((code) => code.trim())
      });
    if (dischargeCriteria !== '' || dischargeDate !== '')
      Object.assign(newEvent, {
        discharge: { date: dischargeDate, criteria: dischargeCriteria }
      });

    PatientService.addEntrytoPatient(id, { ...newEvent, type: 'Hospital' })
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
          label='Discharge Date'
          value={dischargeDate}
          onChange={(event) => setDischargeDate(event.target.value)}
        />
        <TextField
          label='Discharge Criteria'
          value={dischargeCriteria}
          onChange={(event) => setDischargeCriteria(event.target.value)}
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

export default NewHospitalEntryForm;
