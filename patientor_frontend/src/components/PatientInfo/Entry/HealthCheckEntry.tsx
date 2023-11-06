import {
  HealthCheckEntry as HCEType,
  HealthCheckRating,
  Diagnosis
} from '../../../types';

import { Box, Typography } from '@mui/material';
import { Favorite, FactCheck } from '@mui/icons-material';

interface EntryProps {
  entry: HCEType;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = (props: EntryProps) => {
  const { entry, diagnoses } = props;

  let color = '';

  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      color = 'green';
      break;
    case HealthCheckRating.LowRisk:
      color = 'yellow';
      break;
    case HealthCheckRating.HighRisk:
      color = 'orange';
      break;
    case HealthCheckRating.CriticalRisk:
      color = 'red';
      break;
    default:
      color = 'black';
  }

  return (
    <Box sx={{ border: '1px solid black', borderRadius: '5px' }} p={1} m={1}>
      <Typography variant='body1'>
        {entry.date} <FactCheck />
      </Typography>
      <Typography variant='body1'>
        <em>{entry.description}</em>
      </Typography>
      <Favorite sx={{ color }} />
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
      <Typography variant='body1'>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntry;
