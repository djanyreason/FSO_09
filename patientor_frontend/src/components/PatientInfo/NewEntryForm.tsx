import { useState } from 'react';

import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

import { Entry } from '../../types';
import NewHealthCheckEntryForm from './NewHealthCheckEntryForm';
import NewOccupationalHealthcareEntryForm from './NewOccupationalHealthcareEntryForm';
import NewHospitalEntryForm from './NewHospitalEntryForm';

interface NEFProps {
  addEntry: (newEntry: Entry) => void;
  id: string;
}

const NewEntryForm = (props: NEFProps) => {
  const { addEntry, id } = props;
  const [entryFormType, setEntryFormType] = useState<string>('Health Check');
  const [entryForm, setEntryForm] = useState<JSX.Element>(
    <NewHealthCheckEntryForm addEntry={addEntry} id={id} />
  );

  const changeForm = (event: SelectChangeEvent) => {
    setEntryFormType(event.target.value);
    switch (event.target.value) {
      case 'Health Check': {
        setEntryForm(<NewHealthCheckEntryForm addEntry={addEntry} id={id} />);
        break;
      }
      case 'Occupational Healthcare': {
        setEntryForm(
          <NewOccupationalHealthcareEntryForm addEntry={addEntry} id={id} />
        );
        break;
      }
      case 'Hospital': {
        setEntryForm(<NewHospitalEntryForm addEntry={addEntry} id={id} />);
        break;
      }
      default:
        break;
    }
  };

  return (
    <Box sx={{ border: '2px black dotted' }} p={2}>
      <Typography variant='h6'>
        New{' '}
        <Select
          value={entryFormType}
          onChange={changeForm}
          size='small'
          sx={{ fontWeight: '600' }}
        >
          <MenuItem value='Health Check'>Health Check</MenuItem>
          <MenuItem value='Hospital'>Hospital</MenuItem>
          <MenuItem value='Occupational Healthcare'>
            Occupational Healthcare
          </MenuItem>
        </Select>{' '}
        Entry
      </Typography>
      <br />
      {entryForm}
    </Box>
  );
};

export default NewEntryForm;
