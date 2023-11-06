import { useState } from 'react';
import axios from 'axios';

import {
  Button,
  TextField,
  Stack,
  Select,
  SelectChangeEvent,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  OutlinedInput,
  FormControl
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

import { Entry, HealthCheckRating } from '../../types';
import PatientService from '../../services/patients';

interface NHCEFProps {
  addEntry: (newEntry: Entry) => void;
  id: string;
  diagnoses: string[];
}

const NewHealthCheckEntryForm = (props: NHCEFProps): JSX.Element => {
  const { addEntry, id, diagnoses } = props;

  const [day, setDay] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dcs, setDCs] = useState<string[]>([]);
  const [hcr, setHCR] = useState<string>('');

  const hcrPairs = Object.entries(HealthCheckRating).filter(
    (entry) => !isNaN(Number(entry[0]))
  );

  const reset = () => {
    setDCs([]);
    setDay(null);
    setSpecialist('');
    setDescription('');
    setHCR('');
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (hcr === '') {
      window.alert('Please Select Health Check Rating!');
      return;
    }
    const thisPair = hcrPairs.find((p) => p[1] === hcr);
    if (!thisPair) {
      window.alert('Please Select Valid Health Check Rating!');
      return;
    }

    const date = !day
      ? ''
      : day.year() + '-' + (1 + day.month()) + '-' + day.date();
    const healthCheckRating = Number(thisPair[0]);
    const newEvent = { date, specialist, description, healthCheckRating };
    if (dcs.length !== 0)
      Object.assign(newEvent, {
        diagnosisCodes: dcs
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

  const handleDCChange = (event: SelectChangeEvent<typeof dcs>) => {
    setDCs(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={1}>
        <TextField
          label='Description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <DatePicker
          label='Date'
          value={day}
          onChange={(newValue) => setDay(newValue)}
        />
        <TextField
          label='Specialist'
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        />
        <FormControl>
          <InputLabel id='HCRs'>Health Check Ratings</InputLabel>
          <Select
            labelId='HCRs'
            value={hcr}
            onChange={(event) => setHCR(event.target.value)}
            label='Health Check Ratings'
          >
            {hcrPairs.map((d) => (
              <MenuItem key={Number(d[0])} value={d[1]}>
                {d[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='diagnosis-codes'>Diagnosis Codes</InputLabel>
          <Select
            id='diagnosis-codes'
            multiple
            value={dcs}
            onChange={handleDCChange}
            input={<OutlinedInput label='Diagnosis Codes' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={{ PaperProps: { style: { maxHeight: 224 } } }}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d} value={d}>
                <Checkbox checked={dcs.indexOf(d) > -1} />
                <ListItemText primary={d} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default NewHealthCheckEntryForm;
