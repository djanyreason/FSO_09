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

import { Entry } from '../../types';
import PatientService from '../../services/patients';

interface NHCEFProps {
  addEntry: (newEntry: Entry) => void;
  id: string;
  diagnoses: string[];
}

const NewOccupationalHealthcareEntryForm = (props: NHCEFProps): JSX.Element => {
  const { addEntry, id, diagnoses } = props;

  const [day, setDay] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dcs, setDCs] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<Dayjs | null>(null);
  const [sickLeaveEnd, setSickLeaveEnd] = useState<Dayjs | null>(null);

  const reset = () => {
    setDCs([]);
    setDay(null);
    setSpecialist('');
    setDescription('');
    setEmployerName('');
    setSickLeaveStart(null);
    setSickLeaveEnd(null);
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const date = !day
      ? ''
      : day.year() + '-' + (1 + day.month()) + '-' + day.date();
    const newEvent = { date, specialist, description, employerName };
    if (dcs.length !== 0)
      Object.assign(newEvent, {
        diagnosisCodes: dcs
      });

    if (sickLeaveStart !== null || sickLeaveEnd !== null)
      Object.assign(newEvent, {
        sickLeave: {
          startDate: !sickLeaveStart
            ? ''
            : sickLeaveStart.year() +
              '-' +
              (1 + sickLeaveStart.month()) +
              '-' +
              sickLeaveStart.date(),
          endDate: !sickLeaveEnd
            ? ''
            : sickLeaveEnd.year() +
              '-' +
              (1 + sickLeaveEnd.month()) +
              '-' +
              sickLeaveEnd.date()
        }
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
        <TextField
          label='Employer Name'
          value={employerName}
          onChange={(event) => setEmployerName(event.target.value)}
        />
        <DatePicker
          label='Sick Leave Start Date'
          value={sickLeaveStart}
          onChange={(newValue) => setSickLeaveStart(newValue)}
        />
        <DatePicker
          label='Sick Leave End Date'
          value={sickLeaveEnd}
          onChange={(newValue) => setSickLeaveEnd(newValue)}
        />
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

export default NewOccupationalHealthcareEntryForm;
